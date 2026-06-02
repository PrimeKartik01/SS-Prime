<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://prideworld-city.in");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

/*
|--------------------------------------------------------------------------
| OPTIONS Request
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/*
|--------------------------------------------------------------------------
| Only POST Allowed
|--------------------------------------------------------------------------
*/

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "error" => "Method Not Allowed"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Rate Limit
| 6 Requests / 24 Hours / IP
|--------------------------------------------------------------------------
*/

$ip = $_SERVER['REMOTE_ADDR'];

$rateDir = __DIR__ . "/rate_limit";

if (!is_dir($rateDir)) {
    mkdir($rateDir, 0755, true);
}

$rateFile = $rateDir . "/" . md5($ip) . ".json";

$window = 24 * 60 * 60; // 24 hours
$maxRequests = 6;

$now = time();

if (file_exists($rateFile)) {

    $rateData = json_decode(
        file_get_contents($rateFile),
        true
    );

    if (
        isset($rateData['count']) &&
        isset($rateData['start']) &&
        ($now - $rateData['start']) < $window
    ) {

        if ($rateData['count'] >= $maxRequests) {

            http_response_code(429);

            echo json_encode([
                "success" => false,
                "error" => "Too many submissions. Please try again tomorrow."
            ]);

            exit;
        }

        $rateData['count']++;

    } else {

        $rateData = [
            "count" => 1,
            "start" => $now
        ];
    }

} else {

    $rateData = [
        "count" => 1,
        "start" => $now
    ];
}

file_put_contents(
    $rateFile,
    json_encode($rateData),
    LOCK_EX
);

/*
|--------------------------------------------------------------------------
| Read Request Body
|--------------------------------------------------------------------------
*/

$raw = file_get_contents("php://input");

if ($raw === false || trim($raw) === '') {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "Empty request body"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Decode JSON
|--------------------------------------------------------------------------
*/

$data = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "Invalid JSON"
    ]);

    exit;
}

if (!is_array($data) || empty($data)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "No data provided"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Sanitize Inputs
|--------------------------------------------------------------------------
*/

$name = trim($data['name'] ?? '');
$number = trim($data['number'] ?? '');
$email = trim($data['email'] ?? '');
$city = trim($data['city'] ?? '');
$project = trim($data['project'] ?? '');
$flat = trim($data['flat'] ?? '');
$source = trim($data['source'] ?? '');
$price = trim($data['price'] ?? '');
$availability = trim($data['availability'] ?? '');

function parseBudgetValue($price) {
    if (empty($price)) {
        return '';
    }

    if (preg_match('/([\d\.]+)\s*Cr/i', $price, $matches)) {
        return strval((int) round(floatval($matches[1]) * 10000000));
    }

    if (preg_match('/([\d\.]+)\s*Lakhs?/i', $price, $matches)) {
        return strval((int) round(floatval($matches[1]) * 100000));
    }

    if (preg_match('/([\d,]+)/', $price, $matches)) {
        return preg_replace('/[^\d]/', '', $matches[1]);
    }

    return preg_replace('/[^\d]/', '', $price);
}

$budget = parseBudgetValue($price);

/*
|--------------------------------------------------------------------------
| Required Fields
|--------------------------------------------------------------------------
*/

if (
    empty($name) ||
    empty($number) ||
    empty($email) ||
    empty($city) ||
    empty($project) ||
    empty($flat)
) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "All fields are required"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Email Validation
|--------------------------------------------------------------------------
*/

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "Invalid email address"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Mobile Validation (India)
|--------------------------------------------------------------------------
*/

if (!preg_match('/^[6-9][0-9]{9}$/', $number)) {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "error" => "Invalid mobile number"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Save Lead
|--------------------------------------------------------------------------
*/

$lead = [
    "created_at" => date("Y-m-d H:i:s"),
    "ip" => $ip,
    "source" => $source,
    "name" => $name,
    "number" => $number,
    "email" => $email,
    "city" => $city,
    "project" => $project,
    "flat" => $flat,
    "price" => $price,
    "availability" => $availability,
    "budget" => $budget
];

$crmPayload = [
    "name" => $name,
    "state" => "",
    "city" => $city,
    "location" => $project,
    "budget" => $budget ?: $price,
    "notes" => "Website lead from {$source}. Flat: {$flat}. Availability: {$availability}.",
    "email" => $email,
    "countryCode" => "91",
    "mobile" => $number,
    "project" => $project,
    "property" => $flat,
    "leadExpectedBudget" => $budget ?: $price,
    "propertyType" => "Flat",
    "submittedDate" => date("d-m-y"),
    "submittedTime" => date("H:i:s"),
    "LeadId" => "",
    "subsource" => "PWC Google Ads",
    "leadStatus" => "New Lead",
    "callRecordingUrl" => "",
    "scheduledDate" => "",
    "additionalProperties" => [
        "price" => $price,
        "availability" => $availability,
        "formName" => "PWC Web Lead From",
        "submissionIp" => $ip
    ]
];

function sendCrmLead($url, $apiKey, $payload) {
    if (!function_exists('curl_init')) {
        return [
            "success" => false,
            "http_code" => 0,
            "response" => null,
            "error" => "cURL is not available on this server"
        ];
    }

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "API-Key: {$apiKey}",
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([$payload], JSON_UNESCAPED_UNICODE));
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);

    if ($response === false || $httpCode < 200 || $httpCode >= 300) {
        return [
            "success" => false,
            "http_code" => $httpCode,
            "response" => $response,
            "error" => $error
        ];
    }

    $decoded = json_decode($response, true);

    return [
        "success" => true,
        "http_code" => $httpCode,
        "response" => $decoded ?: $response
    ];
}

$crmApiUrl = "https://connect.leadrat.com/api/v1/integration/Website";
$crmApiKey = "YWIxZGVhODQtNjRjNy00ZmRmLWFhZjctNjUzYzYxYTdlNjk1";
$crmResult = sendCrmLead($crmApiUrl, $crmApiKey, $crmPayload);
file_put_contents(
    __DIR__ . "/crm_response.txt",
    json_encode([
        "payload" => $crmPayload,
        "response" => $crmResult
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

if (!$crmResult["success"]) {
    $lead["crm_error"] = $crmResult["error"] ?: $crmResult["response"];
    $lead["crm_http_code"] = $crmResult["http_code"];
} else {
    $lead["crm_response"] = $crmResult["response"];
}

$line = json_encode(
    $lead,
    JSON_UNESCAPED_UNICODE
) . PHP_EOL;

$res = file_put_contents(
    __DIR__ . "/leads.txt",
    $line,
    FILE_APPEND | LOCK_EX
);

if ($res === false) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "error" => "Failed to save lead"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Success Response
|--------------------------------------------------------------------------
*/

echo json_encode([
    "success" => true,
    "message" => "Lead submitted successfully"
]);