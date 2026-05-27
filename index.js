
import { slides, projects, projectFlats } from "./data/data.js";


//------------------------------------------------------------------------------------------------
// Navbar functionality: Start
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const mobileMenu = document.getElementById("mobile-menu");

// Open Menu
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("left-[-100%]");
    mobileMenu.classList.add("left-0");
});

function closeMenu() {
    mobileMenu.classList.remove("left-0");
    mobileMenu.classList.add("left-[-100%]");
}

// Close Menu button
closeBtn.addEventListener("click", closeMenu);

// Close when clicking outside the menu
document.addEventListener("click", (event) => {
    const isMenuOpen = mobileMenu.classList.contains("left-0");
    const clickInsideMenu = mobileMenu.contains(event.target);
    const clickOnButton = menuBtn.contains(event.target);

    if (isMenuOpen && !clickInsideMenu && !clickOnButton) {
        closeMenu();
    }
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
allSlides.map((slide) => {

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
});

let current = 0;

function changeSlide() {

    current++;

    const slideWidth =
        document.querySelector(".carousel-container").clientWidth;

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
setInterval(changeSlide, 4500);
// Header carousel animation: End
//------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------
// Form Logic: Start
// Elements
const enquiryModal =
    document.getElementById("enquiryModal");

const closeModal =
    document.getElementById("closeModal");

const projectSelect =
    document.getElementById("projectSelect");

const flatSelect =
    document.getElementById("flatSelect");

const flatPrice =
    document.getElementById("flatPrice");

const flatAvailability =
    document.getElementById("flatAvailability");

const pricingBox =
    document.getElementById("pricingBox");

// Close Popup
closeModal.addEventListener("click", () => {

    enquiryModal.classList.add("hidden");
    enquiryModal.classList.remove("flex");

});
closeModal.addEventListener("click", () => {

    enquiryModal.classList.add("hidden");
    enquiryModal.classList.remove("flex");

});

// Update Flats
function updateFlats(project) {

    flatSelect.innerHTML = "<option value=\"\" disabled selected>Choose a flat type</option>";

    projectFlats[project].map((flat, index) => {

        flatSelect.innerHTML += `
        
            <option value="${index}">
                ${flat.type}
            </option>

        `;
    });

    flatSelect.value = "";
    pricingBox.classList.add("hidden");

}

// Update Price
function updatePrice(project) {

    if (flatSelect.value === "") {
        pricingBox.classList.add("hidden");
        return;
    }

    const selectedFlat =
        projectFlats[project][flatSelect.value];

    flatPrice.innerText =
        selectedFlat.price;

    flatAvailability.innerText =
        selectedFlat.available;

    pricingBox.classList.remove("hidden");

}

// Project Change
projectSelect.addEventListener("change", () => {

    updateFlats(projectSelect.value);

});

// Flat Change
flatSelect.addEventListener("change", () => {

    updatePrice(projectSelect.value);

});
// Form Logic: End
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------
// Project Card Section: Start
const container = document.getElementById("projects-container");

projects.map((project, index) => {

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
});

// Open Popup
const dynamicEnquireButtons = document.querySelectorAll(".enquire-btn");

dynamicEnquireButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const project = btn.dataset.project;

        enquiryModal.classList.remove("hidden");
        enquiryModal.classList.add("flex");

        if (project) {
            projectSelect.value = project;
            updateFlats(project);
        } else {
            projectSelect.value = "";
            flatSelect.innerHTML = "<option value=\"\" disabled selected>Choose a flat type</option>";
            pricingBox.classList.add("hidden");
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