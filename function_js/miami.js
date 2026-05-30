
import { projects, aboutSectionData, amenitiesData } from "../data/miami_data.js";

import { luxuryGallery } from '../data/miami_data.js';

import { initLuxuryGallery } from './gallery.js';

initLuxuryGallery({
    galleryId: 'homeGallery',
    modalId: 'galleryModal',
    images: luxuryGallery,
});


const currentProject =
    projects.miami;

/* ========================================================= */
/* HERO CONTENT */
/* ========================================================= */

document.getElementById("heroTagline").textContent =
    currentProject.tagline;

document.getElementById("heroTitle").innerHTML =
    currentProject.title.replace(" ", "<br>");

document.getElementById("heroDescription").textContent =
    currentProject.description;

document.getElementById("heroConfiguration").textContent =
    currentProject.configuration;

document.getElementById("heroPrice").textContent =
    currentProject.price;

document.getElementById("heroPossession").textContent =
    currentProject.possession;

document.getElementById("heroAmenities").textContent =
    currentProject.amenities;

document.getElementById("heroCardDescription").textContent =
    currentProject.cardDescription;

/* ========================================================= */
/* HERO IMAGE CROSSFADE */
/* ========================================================= */

const heroImage1 =
    document.getElementById("heroImage1");

const heroImage2 =
    document.getElementById("heroImage2");

const images =
    currentProject.heroImages;

let currentIndex = 0;

let activeImage = heroImage1;

let nextImage = heroImage2;

/* Initial Image */
activeImage.src = images[0];

activeImage.classList.add("hero-zoom");

/* Smooth Slider */
setInterval(() => {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    /* Set next image */
    nextImage.src =
        images[currentIndex];

    /* Reset states */
    nextImage.classList.remove("opacity-0");

    nextImage.classList.add(
        "opacity-100",
        "hero-zoom"
    );

    /* Fade current */
    activeImage.classList.remove(
        "opacity-100",
        "hero-zoom"
    );

    activeImage.classList.add("opacity-0");

    /* Swap images */
    setTimeout(() => {

        const temp = activeImage;

        activeImage = nextImage;

        nextImage = temp;

    }, 2000);

}, 5000);


/* =========================
   ABOUT SECTION CONTENT MAP
========================= */

// Render title and description
document.getElementById("aboutTitle").textContent = aboutSectionData.title;
document.getElementById("aboutDescription").textContent = aboutSectionData.description;

// Render gallery images
const galleryContainer = document.getElementById("aboutGalleryContainer");

aboutSectionData.gallery.forEach((image) => {

    const imgElement = document.createElement("img");

    imgElement.src = image.src;

    imgElement.alt = image.alt;

    imgElement.className = `about-image ${image.classes}`;

    galleryContainer.appendChild(imgElement);

});

// Render features
const featuresContainer = document.getElementById("aboutFeaturesContainer");

aboutSectionData.features.forEach((feature) => {

    const featureHTML = `

        <div class="flex gap-5">

            <div class="min-w-[3.5rem] h-14 rounded-2xl bg-[#f6f1e7] border border-[#eadfc8] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.7" stroke="#b08d57" class="w-7 h-7"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg> 
            </div>


            <div>

                <h3 class="text-2xl font-semibold text-[#111827] mb-2">
                    ${feature.title}
                </h3>

                <p class="text-neutral-600 leading-7">
                    ${feature.description}
                </p>

            </div>

        </div>`;

    featuresContainer.innerHTML += featureHTML;

});



// -------------------------
// 2. Map through data and render UI
const container = document.getElementById('amenities-container');

container.innerHTML = amenitiesData.map(item => 
    `
      <div class="amenity-card flex flex-col items-center text-center group cursor-pointer p-4 w-full max-w-[160px] rounded-xl hover:bg-slate-100/60">
        <div class="w-20 h-20 flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs group-hover:scale-105 group-hover:border-slate-400 group-hover:shadow-md transition-all duration-300">
          ${item.svg}
        </div>
        <span class="mt-4 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors duration-200 leading-tight">
          ${item.title}
        </span>
      </div>
    `).join('');



/* =========================
   LOCATION DATA
========================= */
  /*
  =====================================
  DATA OBJECT
  =====================================
  */

  const LOCATION_DATA = {

    baseLocation: {
      name: "Pride World City",
      lat: 18.6278,
      lng: 73.9320
    },

    locations: [

      { name: "Airport",       lat: 18.5822, lng: 73.9197 },
      { name: "Kalyani Nagar", lat: 18.5484, lng: 73.9007 },
      { name: "Koregaon Park", lat: 18.5362, lng: 73.8930 },
      { name: "Kharadi",       lat: 18.5519, lng: 73.9506 },
      { name: "Wagholi",       lat: 18.5793, lng: 73.9781 },
      { name: "EON IT Park",   lat: 18.5603, lng: 73.9397 },
      { name: "Yerwada",       lat: 18.5514, lng: 73.8786 },
      { name: "Bhosari MIDC",  lat: 18.6298, lng: 73.8403 },
      { name: "Moshi",         lat: 18.6794, lng: 73.8582 },
      { name: "Alandi",        lat: 18.6775, lng: 73.8987 },
      { name: "Chakan",        lat: 18.7606, lng: 73.8636 },
      { name: "Hinjewadi",     lat: 18.5910, lng: 73.7389 }

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
