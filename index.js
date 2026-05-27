
import { slides } from "./data/data.js";


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



/**
 * carousel animation
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
            <div class="absolute inset-0 bg-black/30"></div>

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