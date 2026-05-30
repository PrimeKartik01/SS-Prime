
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
if (slider) { allSlides.map((slide) => {

    slider.innerHTML += `

        <div class="relative min-w-full h-full overflow-hidden">

            <!-- Background Image -->
            <img 
                src="${slide.image}" 
                class="w-full h-full object-cover"
                alt=""
            >

            <!-- Soft Dark Overlay -->
            <div class="absolute inset-0 bg-black/55"></div>

            <!-- Content -->
            <div class="absolute bottom-8 md:bottom-14 left-6 md:left-12 text-white z-10 max-w-lg">

                <p class="uppercase tracking-[0.3rem] font-semibold text-xs md:text-sm mb-3 opacity-80">
                    Prime world City
                </p>

                <h1 class="text-3xl md:text-6xl leading-tight font-semibold mb-4 animate-content">
                    ${slide.title}
                </h1>

                <p class="text-sm md:text-lg leading-7 opacity-90 font-light animate-content">
                    ${slide.description}
                </p>

                <button class="mt-6 px-6 py-3 rounded-full bg-white/90 text-black text-sm md:text-base font-medium hover:bg-white transition-all duration-300">
                    Explore Properties
                </button>

            </div>

        </div>

    `;
}); }

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

    form.addEventListener("submit", (e) => {
        e.preventDefault();

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

        const flat = projectFlats[project][flatIndex].type;

        console.log(`Enquiry submitted from form #${formId}:`, { name, number, email, city, project, flat });

        // Show luxury toast notification
        showToast(`Thank you, ${name}! Your enquiry for ${project} (${flat}) has been received.`);

        // Reset form state
        form.reset();
        pBox.classList.add("hidden");
        flatSel.innerHTML = '<option value="" disabled selected>Choose flat</option>';

        // If popup modal form, close modal
        if (formId === "modalEnquiryForm") {
            const modal = document.getElementById("enquiryModal");
            if (modal) {
                modal.classList.add("hidden");
                modal.classList.remove("flex");
            }
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
enquiryModal.addEventListener("click", (e) => {
    if (e.target === enquiryModal) {
        enquiryModal.classList.add("hidden");
        enquiryModal.classList.remove("flex");
    }
});

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

// Form Logic: End
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------
// Project Card Section: Start
const container = document.getElementById("projects-container");

if (container) { projects.map((project, index) => {

    // Duplicate first image for infinite loop
    const images = [
        ...project.images,
        project.images[0]
    ];

    container.innerHTML += `

    <div class="bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/40 shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 group">

        <!-- Carousel -->
        <div class="relative overflow-hidden h-72">

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
        <div class="p-7">

            <!-- Tags -->
            <div class="flex flex-wrap gap-3 mb-6">

                ${project.tags.map((tag) => `

                    <span class="px-4 py-2 rounded-full bg-[#f5efe6] text-[#8f6b32] text-sm font-medium border border-[#e8dcc8]">
                        ${tag}
                    </span>

                `).join("")}

            </div>

            <!-- Description -->
            <p class="text-neutral-600 leading-7 mb-7">
                ${project.description}
            </p>

            <!-- Buttons -->
            <div class="flex gap-4">

                <button
                    data-project="${project.name}"
                    class="enquire-btn flex-1 py-3 rounded-full bg-gradient-to-r from-[#1f2937] to-[#111827] text-white hover:scale-105 hover:shadow-xl transition-all duration-300">

                    Enquire

                </button>

                <a href="${project.link}"
                    class="flex-1 py-3 rounded-full border border-[#d4af37]/40 bg-white/60 text-center text-[#1f2937] hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-300">

                    View Project

                </a>

            </div>

        </div>

    </div>

`;
}); }

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


