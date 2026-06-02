
import { slides, projects, projectFlats } from "./data/data.js";


//------------------------------------------------------------------------------------------------
// Navbar functionality: Start
// =====================================================
// MOBILE MENU
// =====================================================

const menuBtn = document.getElementById("menu-btn");

const closeBtn = document.getElementById("close-btn");

const mobileMenu = document.getElementById("mobile-menu");

// Open Menu
menuBtn.addEventListener("click", () => {

    mobileMenu.classList.remove("left-[-100%]");

    mobileMenu.classList.add("left-0");

});

// Close Function
function closeMenu() {

    mobileMenu.classList.remove("left-0");

    mobileMenu.classList.add("left-[-100%]");

}

// Close Button
closeBtn.addEventListener("click", closeMenu);

// Close mobile menu when clicking a link
if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll("a[href^='#'], a[href*='#']");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });
}

// Click Outside
document.addEventListener("click", (event) => {

    const isMenuOpen =
        mobileMenu.classList.contains("left-0");

    const clickInsideMenu =
        mobileMenu.contains(event.target);

    const clickOnButton =
        menuBtn.contains(event.target);

    if (
        isMenuOpen &&
        !clickInsideMenu &&
        !clickOnButton
    ) {

        closeMenu();

    }

});

// =====================================================
// MOBILE PROJECT DROPDOWN
// =====================================================

const mobileProjectBtn =
    document.getElementById("mobile-project-btn");

const mobileProjectDropdown =
    document.getElementById("mobile-project-dropdown");

const mobileArrow =
    document.getElementById("mobile-arrow");

// Toggle Dropdown
mobileProjectBtn.addEventListener("click", () => {

    mobileProjectDropdown.classList.toggle("hidden");

    mobileProjectDropdown.classList.toggle("flex");

    mobileArrow.classList.toggle("rotate-180");

});

// Navbar functionality: End
//------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------
/**
 * Header carousel ainmation: Start
 * couse setInterval to run every 3 seconds, allowing 2 seconds for the image to be displayed and 1 second for the transition animation 
 */

// Duplicate first slide
const allSlides = [...slides, slides[0]];

const slider = document.getElementById("slider");

// Create Slides
if (slider) {
    allSlides.map((slide) => {

        slider.innerHTML += `

        <div class="relative min-w-full h-full overflow-hidden">

            <!-- Background Image -->
            <img 
                src="${slide.image}" 
                class="w-full h-full object-fill"
                alt=""
            >

            <!-- Soft Dark Overlay -->
            <div class="absolute inset-0 bg-black/55"></div>

            <!-- Content -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10  text-center">

                <p class="uppercase tracking-[0.3rem] font-semibold text-xs md:text-2xl mb-3 opacity-80">
                     ${slide.subtitle}
                </p>

                <h1 class="text-5xl md:text-8xl leading-tight font-semibold mb-4 animate-content">
                    ${slide.title}
                </h1>

                <p class="text-sm md:text-lg leading-7 opacity-90 font-light animate-content">
                    ${slide.description}
                </p>

                <div class="mt-6">
                    <a class=" px-6 py-3 rounded-full bg-white/90 text-black text-sm md:text-base font-medium hover:bg-white transition-all duration-300" href="#projects-container">
                        Explore Properties
                    </a>
                </div>

            </div>

        </div>

    `;
    });
}

let current = 0;

function changeSlide() {

    current++;

    if (!slider) return;
    const slideWidth =
        document.querySelector(".carousel-container")?.clientWidth || 0;

    slider.style.transition =
        "transform 2s ease-in-out";

    slider.style.transform =
        `translateX(-${current * slideWidth}px)`;

    // Infinite smooth loop
    if (current === slides.length) {

        setTimeout(() => {

            slider.style.transition = "none";

            current = 0;

            slider.style.transform =
                `translateX(0px)`;

        }, 2000);
    }
}

// Auto Slide
if (slider) { setInterval(changeSlide, 4500); }
// Header carousel animation: End
//------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------
// Form Logic: Start

const ENQUIRY_SUBMISSION_KEY = "enquirySubmissionData";
const ENQUIRY_SUBMISSION_LIMIT = 5;
const ENQUIRY_SUBMISSION_WINDOW_MS = 24 * 60 * 60; // 24 hours
let enquiryLimitTimeout = null;

function getEnquirySubmissionData() {
    const raw = localStorage.getItem(ENQUIRY_SUBMISSION_KEY);
    if (!raw) {
        return { count: 0, start: 0 };
    }

    try {
        const data = JSON.parse(raw);
        return {
            count: typeof data.count === "number" ? data.count : 0,
            start: typeof data.start === "number" ? data.start : 0
        };
    } catch {
        return { count: 0, start: 0 };
    }
}

function setEnquirySubmissionData(data) {
    localStorage.setItem(ENQUIRY_SUBMISSION_KEY, JSON.stringify(data));
}

function isEnquiryWindowExpired(data) {
    return data.start === 0 || Date.now() - data.start >= ENQUIRY_SUBMISSION_WINDOW_MS;
}

function getEnquirySubmissionCount() {
    const data = getEnquirySubmissionData();
    if (isEnquiryWindowExpired(data)) {
        return 0;
    }
    return data.count;
}

function incrementEnquirySubmissionCount() {
    const data = getEnquirySubmissionData();

    if (isEnquiryWindowExpired(data)) {
        data.count = 1;
        data.start = Date.now();
    } else {
        data.count += 1;
    }

    setEnquirySubmissionData(data);
    return data.count;
}

function disableEnquiryForms() {
    const forms = document.querySelectorAll("#modalEnquiryForm, #inlineEnquiryForm");
    forms.forEach((form) => {
        const elements = form.querySelectorAll("input, select, button[type='submit']");
        elements.forEach((el) => {
            el.disabled = true;
        });
    });
}

function enableEnquiryForms() {
    if (enquiryLimitTimeout) {
        clearTimeout(enquiryLimitTimeout);
        enquiryLimitTimeout = null;
    }
    const forms = document.querySelectorAll("#modalEnquiryForm, #inlineEnquiryForm");
    forms.forEach((form) => {
        const elements = form.querySelectorAll("input, select, button[type='submit']");
        elements.forEach((el) => {
            el.disabled = false;
        });
    });
}

function setUserHasSubmitted() {
    try { localStorage.setItem('hasSubmitted', '1'); } catch (e) { }
}

function isUserSubmitted() {
    try { return localStorage.getItem('hasSubmitted') === '1'; } catch (e) { return false; }
}

function scheduleEnquiryLimitReset(data) {
    const remainingMs = ENQUIRY_SUBMISSION_WINDOW_MS - (Date.now() - data.start);
    if (remainingMs <= 0) {
        return;
    }
    if (enquiryLimitTimeout) {
        clearTimeout(enquiryLimitTimeout);
    }
    enquiryLimitTimeout = setTimeout(() => {
        updateEnquiryLimitState();
    }, remainingMs + 50);
}

function updateEnquiryLimitState() {
    const data = getEnquirySubmissionData();

    if (isEnquiryWindowExpired(data)) {
        setEnquirySubmissionData({ count: 0, start: 0 });
        enableEnquiryForms();
        return true;
    }

    if (data.count >= ENQUIRY_SUBMISSION_LIMIT) {
        disableEnquiryForms();
        scheduleEnquiryLimitReset(data);
        showToast(
            `You have reached the maximum of ${ENQUIRY_SUBMISSION_LIMIT} enquiries. Please try again after ${Math.ceil((ENQUIRY_SUBMISSION_WINDOW_MS - (Date.now() - data.start)) / 1000)} seconds.`,
            "error"
        );
        return false;
    }

    enableEnquiryForms();
    return true;
}

// Toast Notification Function
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `px-6 py-4 rounded-2xl shadow-2xl text-white font-medium flex items-center gap-3 translate-y-[-20px] opacity-0 transition-all duration-500 pointer-events-auto ${type === "success"
        ? "bg-gradient-to-r from-[#1f2937] to-[#0f172a] border border-[#d4af37]/30 text-[#f5d68a]"
        : "bg-gradient-to-r from-red-600 to-rose-700 border border-red-500/20 text-white"
        }`;

    // Icon
    const icon = type === "success"
        ? `<svg class="w-6 h-6 text-[#d4af37]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
        : `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    toast.innerHTML = `
        ${icon}
        <span class="text-sm md:text-base">${message}</span>
    `;

    const container = document.getElementById("toastContainer");
    if (container) {
        container.appendChild(toast);
        // Trigger transition
        setTimeout(() => {
            toast.classList.remove("translate-y-[-20px]", "opacity-0");
            toast.classList.add("translate-y-0", "opacity-100");
        }, 10);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove("translate-y-0", "opacity-100");
            toast.classList.add("translate-y-[-20px]", "opacity-0");
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }
}

// Reusable Enquiry Form Controller
function initEnquiryForm(formId, selectProjId, selectFlatId, pricingBoxId, priceId, availId) {
    const form = document.getElementById(formId);
    const projSelect = document.getElementById(selectProjId);
    const flatSel = document.getElementById(selectFlatId);
    const pBox = document.getElementById(pricingBoxId);
    const fPrice = document.getElementById(priceId);
    const fAvail = document.getElementById(availId);

    if (!form || !projSelect || !flatSel || !pBox || !fPrice || !fAvail) return null;

    function populateFlats(project) {
        flatSel.innerHTML = '<option value="" disabled selected>Choose flat</option>';
        if (projectFlats[project]) {
            projectFlats[project].forEach((flat, index) => {
                flatSel.innerHTML += `<option value="${index}">${flat.type}</option>`;
            });
        }
        flatSel.value = "";
        pBox.classList.add("hidden");
    }

    function populatePrice(project) {
        if (flatSel.value === "") {
            pBox.classList.add("hidden");
            return;
        }
        const selectedFlat = projectFlats[project][flatSel.value];
        if (selectedFlat) {
            fPrice.innerText = selectedFlat.price;
            fAvail.innerText = selectedFlat.available;

            // Availability styling based on value
            if (selectedFlat.available.toLowerCase().includes("few")) {
                fAvail.className = "text-amber-500 mt-2 font-medium";
            } else if (selectedFlat.available.toLowerCase().includes("sold") || selectedFlat.available.toLowerCase().includes("no")) {
                fAvail.className = "text-rose-500 mt-2 font-medium";
            } else {
                fAvail.className = "text-green-500 mt-2 font-medium";
            }
            pBox.classList.remove("hidden");
        }
    }

    projSelect.addEventListener("change", () => {
        populateFlats(projSelect.value);
    });

    flatSel.addEventListener("change", () => {
        populatePrice(projSelect.value);
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!updateEnquiryLimitState()) {
            return;
        }

        const nameInput = form.querySelector('input[placeholder*="name"]');
        const numberInput = form.querySelector('input[placeholder*="number"]');
        const emailInput = form.querySelector('input[placeholder*="email"]');
        const cityInput = form.querySelector('input[placeholder*="city"]');

        const name = nameInput ? nameInput.value.trim() : "";
        const number = numberInput ? numberInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const city = cityInput ? cityInput.value.trim() : "";
        const project = projSelect.value;
        const flatIndex = flatSel.value;

        if (!name || !number || !email || !city || !project || flatIndex === "") {
            showToast("Please fill in all the details correctly.", "error");
            return;
        }

        const flat = projectFlats[project][flatIndex]?.type || "";
        const price = projectFlats[project][flatIndex]?.price || "";
        const availability = projectFlats[project][flatIndex]?.available || "";

        if (!flat) {
            showToast("Please select a valid flat type.", "error");
            return;
        }

        try {
            const response = await fetch("/api/enquiry.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    source: formId,
                    name,
                    number,
                    email,
                    city,
                    project,
                    flat,
                    price,
                    availability
                })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || "Submission failed");
            }

            localStorage.setItem("leadSubmitted", "true");

            showToast(
                `Thank you, ${name}! Your enquiry for ${project} (${flat}) has been received.`
            );

            const submissionCount = incrementEnquirySubmissionCount();
            if (submissionCount >= ENQUIRY_SUBMISSION_LIMIT) {
                disableEnquiryForms();
                showToast(
                    `You have reached the maximum of ${ENQUIRY_SUBMISSION_LIMIT} enquiries. Please contact us directly for more help.`,
                    "error"
                );
            }

            // Mark that the user has submitted so they can download brochures
            setUserHasSubmitted();

            form.reset();
            pBox.classList.add("hidden");
            flatSel.innerHTML = '<option value="" disabled selected>Choose flat</option>';

            if (formId === "modalEnquiryForm") {
                const modal = document.getElementById("enquiryModal");
                if (modal) {
                    modal.classList.add("hidden");
                    modal.classList.remove("flex");
                }
            }
        } catch (error) {
            console.error(error);

            showToast(
                error.message || "Unable to submit enquiry.",
                "error"
            );
        }
    });

    return {
        setProject: (project) => {
            projSelect.value = project;
            populateFlats(project);
        }
    };
}

// Elements
const enquiryModal = document.getElementById("enquiryModal");
const closeModal = document.getElementById("closeModal");

// Close Popup
closeModal.addEventListener("click", () => {
    enquiryModal.classList.add("hidden");
    enquiryModal.classList.remove("flex");
});

// Close Popup on Outside Click
if (enquiryModal) {
    enquiryModal.addEventListener("click", (e) => {
        if (e.target === enquiryModal) {
            enquiryModal.classList.add("hidden");
            enquiryModal.classList.remove("flex");
        }
    });
}

// Initialize Form Controllers
const modalController = initEnquiryForm(
    "modalEnquiryForm",
    "modalProjectSelect",
    "modalFlatSelect",
    "modalPricingBox",
    "modalFlatPrice",
    "modalFlatAvailability"
);

const inlineController = initEnquiryForm(
    "inlineEnquiryForm",
    "inlineProjectSelect",
    "inlineFlatSelect",
    "inlinePricingBox",
    "inlineFlatPrice",
    "inlineFlatAvailability"
);

updateEnquiryLimitState();
// ======================================
// AUTO ENQUIRY POPUP
// ======================================

let autoPopupCount = 0;
const MAX_AUTO_POPUPS = 2;

function openEnquiryPopup() {

    if (autoPopupCount >= MAX_AUTO_POPUPS) return;

    if (localStorage.getItem("leadSubmitted")) return;

    enquiryModal.classList.remove("hidden");
    enquiryModal.classList.add("flex");

    autoPopupCount++;
}

// First popup after 10 seconds
setTimeout(() => {
    openEnquiryPopup();
}, 10000);

// Second popup after 50 seconds
setTimeout(() => {
    openEnquiryPopup();
}, 50000);
// Form Logic: End
//------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------
// Project Card Section: Start
const container = document.getElementById("projects-container");

if (container) {
    projects.map((project, index) => {

        // Duplicate first image for infinite loop
        const images = [
            ...project.images,
            project.images[0]
        ];

        container.innerHTML += `

    <div id="${project.name.toLowerCase()}" class="scroll-mt-24 md:h-[35rem] bg-white/70 backdrop-blur-xl flex flex-col md:flex-row rounded-[1.5rem] overflow-hidden border border-white/40 shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 group">

        <!-- Carousel -->
        <div class="relative overflow-hidden w-full md:w-1/2 h-72 md:h-full">

            <!-- Slider -->
            <div id="slider-${index}"
                class="flex h-full transition-all duration-700 ease-in-out">

                ${images.map((img) => `

                    <img 
                        src="${img}"
                        class="min-w-full h-full object-cover"
                        alt=""
                    >

                `).join("")}

            </div>

            <!-- Premium Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
            </div>

            <!-- Luxury Glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-transparent">
            </div>

            <!-- Content -->
            <div class="absolute bottom-6 left-6 text-white z-10">

                <p class="uppercase tracking-[0.25rem] text-xs text-[#f4d38a] mb-2">
                    Premium Residence
                </p>

                <h2 class="text-3xl font-semibold mb-2">
                    ${project.name}
                </h2>

                <p class="text-sm opacity-90 text-neutral-200">
                    ${project.subtitle}
                </p>

            </div>

            <!-- Left Button -->
            <button 
                class="prev-btn absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 border border-white/20 backdrop-blur-xl text-white hover:bg-[#d4af37] hover:text-black hover:scale-110 transition-all duration-300"
                data-index="${index}"
            >
                ←
            </button>

            <!-- Right Button -->
            <button 
                class="next-btn absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 border border-white/20 backdrop-blur-xl text-white hover:bg-[#d4af37] hover:text-black hover:scale-110 transition-all duration-300"
                data-index="${index}"
            >
                →
            </button>

        </div>

        <!-- Content -->
        <div class="p-3 md:p-7 flex flex-col justify-between w-full md:w-1/2">

            <h2 class="text-5xl font-semibold mb-2">
                ${project.name}
            </h2>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-5">

                ${project.tags.map((tag) => `

                    <span class="px-4 py-1.5 rounded-full bg-[#f5efe6] text-[#8f6b32] text-xs font-semibold border border-[#e8dcc8]">
                        ${tag}
                    </span>

                `).join("")}

            </div>

            <!-- Stats Bar -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#f8f6f1] rounded-2xl p-2 md:p-4 mb-5 border border-[#e8dcc8]">

                ${project.stats.map((s) => `
                    <div class="text-center">
                        <p class="text-xl md:text-2xl font-bold text-[#1f2937]">${s.value}</p>
                        <p class="text-[9px] md:text-xs text-neutral-500 uppercase tracking-wider mt-0.5">${s.label}</p>
                    </div>
                `).join("")}

            </div>

            <!-- Features Checklist -->
            <div  class="grid md:grid-cols-2  gap-2">
                <ul class="space-y-2 mb-6">

                    ${project.features.map((f) => `
                        <li class="flex items-start gap-2 text-sm text-neutral-700">
                            <span class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#d4af37]/15 flex items-center justify-center text-[#b08d57]">✔</span>
                            ${f}
                        </li>
                    `).join("")}

                </ul>
                   
                <div class="flex flex-row justify-between items-center gap-2 p-4 border border-[#e8dcc8] rounded-xl h-max">
                    ${project.qr.map((qr) => `
                        <div class="flex flex-col items-center gap-2">
                            <img src="${qr.img}" alt="QR Code" class="w-30 h-30 rounded-lg">
                            <p class="text-xs text-center">${qr.number}</p>
                        </div>
                    `).join("")}
                </div>
            </div>

            <!-- Buttons -->
            <div class="flex gap-2 md:gap-4 max-sm:mt-2">

                <button
                    data-project="${project.name}"
                    class="enquire-btn flex-1 py-2 md:py-7 text-sm md:text-base rounded-xl bg-gradient-to-r from-[#1f2937] to-[#111827] text-white hover:scale-105 hover:shadow-xl transition-all duration-300">

                    Enquire

                </button>

                <a href="${project.link}"
                    data-brochure="${project.link}"
                    data-project="${project.name}"
                    class="brochure-link flex-1 py-2 md:py-7 text-sm md:text-base rounded-xl border border-[#d4af37]/40 bg-yellow-200 text-center text-[#1f2937] hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-300">

                    Download Brochure

                </a>

            </div>

        </div>

    </div>

`;
    });
}

// Open Popup
const dynamicEnquireButtons = document.querySelectorAll(".enquire-btn");

dynamicEnquireButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        let project = btn.dataset.project;

        // Auto-detect project from the page filename when no data-project attribute
        if (!project) {
            const path = window.location.pathname.toLowerCase();
            if (path.includes("miami")) project = "Miami";
            else if (path.includes("montreal")) project = "Montreal";
            else if (path.includes("boston")) project = "Boston";
        }

        enquiryModal.classList.remove("hidden");
        enquiryModal.classList.add("flex");

        if (project) {
            if (modalController) {
                modalController.setProject(project);
            }
        } else {
            const modalProjSelect = document.getElementById("modalProjectSelect");
            if (modalProjSelect) modalProjSelect.value = "";
            const modalFlatSelect = document.getElementById("modalFlatSelect");
            if (modalFlatSelect) modalFlatSelect.innerHTML = "<option value=\"\" disabled selected>Choose flat</option>";
            const modalPricingBox = document.getElementById("modalPricingBox");
            if (modalPricingBox) modalPricingBox.classList.add("hidden");
        }

    });

});

// Intercept brochure downloads: require a successful enquiry submission first
const brochureLinks = document.querySelectorAll('.brochure-link');
brochureLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        const submitted = isUserSubmitted();
        const href = (link.getAttribute('href') || link.dataset.brochure || '').trim();

        if (submitted) {

            e.preventDefault(); // <-- important

            // User already submitted — allow download/navigation.
            if (href) {
                // If anchor has href, navigate programmatically to ensure it works when href was removed.
                window.open(href, "_blank");
            } else {
                e.preventDefault();
                showToast('Brochure not available.', 'error');
            }
            return;
        }

        // Not submitted: open enquiry modal and prevent default navigation
        e.preventDefault();
        const proj = link.dataset.project;
        if (modalController && proj) modalController.setProject(proj);
        if (enquiryModal) {
            enquiryModal.classList.remove('hidden');
            enquiryModal.classList.add('flex');
        }
        showToast('Please submit the enquiry to download the brochure.', 'error');
    });
});

// Slider Logic
const sliders = document.querySelectorAll("[id^='slider-']");

sliders.forEach((slider, index) => {

    let current = 0;

    const totalSlides =
        projects[index].images.length;

    function moveSlide() {

        current++;

        slider.style.transition =
            "transform 0.8s ease-in-out";

        slider.style.transform =
            `translateX(-${current * 100}%)`;

        // Infinite smooth forward loop
        if (current === totalSlides) {

            setTimeout(() => {

                slider.style.transition = "none";

                current = 0;

                slider.style.transform =
                    `translateX(0%)`;

            }, 800);
        }
    }

    // Auto Slide
    let autoSlide =
        setInterval(moveSlide, 3000);

    // Next Button
    const nextBtn =
        document.querySelector(`.next-btn[data-index="${index}"]`);

    nextBtn.addEventListener("click", () => {

        clearInterval(autoSlide);

        moveSlide();

        autoSlide =
            setInterval(moveSlide, 3000);

    });

    // Prev Button
    const prevBtn =
        document.querySelector(`.prev-btn[data-index="${index}"]`);

    prevBtn.addEventListener("click", () => {

        clearInterval(autoSlide);

        if (current <= 0) {
            current = totalSlides;
            slider.style.transition = "none";
            slider.style.transform =
                `translateX(-${current * 100}%)`;
        }

        setTimeout(() => {

            current--;

            slider.style.transition =
                "transform 0.8s ease-in-out";

            slider.style.transform =
                `translateX(-${current * 100}%)`;

        }, 20);

        autoSlide =
            setInterval(moveSlide, 3000);

    });

});

// Project Card Section: End
//------------------------------------------------------------------------------------------------



const LOCATION_DATA = {

    baseLocation: {
        name: "Pride World City",
        lat: 18.6278,
        lng: 73.9320
    },

    locations: [

        { name: "Airport", lat: 18.5822, lng: 73.9197 },
        { name: "Kalyani Nagar", lat: 18.5484, lng: 73.9007 },
        { name: "Koregaon Park", lat: 18.5362, lng: 73.8930 },
        { name: "Kharadi", lat: 18.5519, lng: 73.9506 },
        { name: "Wagholi", lat: 18.5793, lng: 73.9781 },
        { name: "EON IT Park", lat: 18.5603, lng: 73.9397 },
        { name: "Yerwada", lat: 18.5514, lng: 73.8786 },
        { name: "Bhosari MIDC", lat: 18.6298, lng: 73.8403 },
        { name: "Moshi", lat: 18.6794, lng: 73.8582 },
        { name: "Alandi", lat: 18.6775, lng: 73.8987 },
        { name: "Chakan", lat: 18.7606, lng: 73.8636 },
        { name: "Hinjewadi", lat: 18.5910, lng: 73.7389 }

    ]

};



/*
=====================================
GLOBAL VARIABLES
=====================================
*/

let map;
let currentRouteLayer = null;
let activeBtn = null;



/*
=====================================
INIT LEAFLET MAP
=====================================
*/

function initMap() {

    const base = LOCATION_DATA.baseLocation;

    map = L.map("map").setView([base.lat, base.lng], 11);

    // OpenStreetMap tiles — FREE, no key needed
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }
    ).addTo(map);

    // Base marker (Pride World City) — permanent label always visible
    L.marker([base.lat, base.lng])
        .addTo(map)
        .bindTooltip("📍 Pride World City", {
            permanent: true,
            direction: "top",
            className: "base-label",
            offset: [0, -10]
        })
        .openTooltip();

    // Render buttons
    renderLocations();

    // Default: show Airport route
    showRoute(LOCATION_DATA.locations[0]);

}



/*
=====================================
RENDER LOCATION BUTTONS
=====================================
*/

function renderLocations() {

    const container = document.getElementById("locationContainer");

    LOCATION_DATA.locations.forEach((location, index) => {

        const btn = document.createElement("button");

        btn.id = "btn-" + index;

        btn.className =
            "location-btn w-full flex items-center justify-between bg-gray-400 hover:bg-black hover:text-white rounded-2xl p-4";

        btn.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-5 h-5 rounded-full border flex items-center justify-center">
            ➜
          </div>
          <span class="text-xs font-medium">${location.name}</span>
        </div>
      `;

        btn.addEventListener("click", () => {

            // Remove active from previous
            if (activeBtn) activeBtn.classList.remove("active");

            // Set active
            btn.classList.add("active");
            activeBtn = btn;

            showRoute(location);

        });

        container.appendChild(btn);

    });

}



/*
=====================================
SHOW ROUTE USING OSRM (FREE)
=====================================
*/

function showRoute(destination) {

    const base = LOCATION_DATA.baseLocation;

    // OSRM free routing API — no key needed
    const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${base.lng},${base.lat};${destination.lng},${destination.lat}` +
        `?overview=full&geometries=geojson`;

    // Update "To:" label immediately
    document.getElementById("selectedLocation").innerText = destination.name;
    document.getElementById("distanceText").innerText = "Loading...";
    document.getElementById("durationText").innerText = "";

    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.code !== "Ok" || !data.routes.length) {
                document.getElementById("distanceText").innerText = "Error";
                return;
            }

            const route = data.routes[0];

            // Distance in km
            const distanceKm = (route.distance / 1000).toFixed(1);

            // Duration in minutes
            const durationMin = Math.round(route.duration / 60);

            // Update UI
            document.getElementById("distanceText").innerText =
                distanceKm + " KM";

            document.getElementById("durationText").innerText =
                durationMin + " Minutes";

            // Remove previous route from map
            if (currentRouteLayer) {
                map.removeLayer(currentRouteLayer);
            }

            // Draw new route as polyline
            const coords = route.geometry.coordinates.map(
                c => [c[1], c[0]]   // OSRM gives [lng, lat], Leaflet needs [lat, lng]
            );

            currentRouteLayer = L.polyline(coords, {
                color: "#000000",
                weight: 5,
                opacity: 0.8
            }).addTo(map);

            // Add destination marker
            L.marker([destination.lat, destination.lng])
                .addTo(map)
                .bindPopup(`<b>📍 ${destination.name}</b>`)
                .openPopup();

            // Fit map to show full route
            map.fitBounds(currentRouteLayer.getBounds(), { padding: [40, 40] });

        })
        .catch(() => {
            document.getElementById("distanceText").innerText = "No route";
            document.getElementById("durationText").innerText =
                "Check internet connection";
        });

}



// Start the map
initMap();
// location end


