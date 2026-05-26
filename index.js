
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
const images = [
    "images/homepage_building.avif",
    "images/building.jpg",
];

// Duplicate first image
const allImages = [...images, images[0]];

const slider = document.getElementById("slider");

// Create images
allImages.map((img) => {
    slider.innerHTML += `
        <img 
            src="${img}" 
            class="w-full h-full object-cover flex-shrink-0"
            alt=""
        >
    `;
});

let current = 0;

function changeSlide() {

    current++;

    // Get responsive width
    const slideWidth =
        document.querySelector(".carousel-container").clientWidth;

    slider.style.transition = "transform 1s ease-in-out";

    slider.style.transform =
        `translateX(-${current * slideWidth}px)`;

    // Infinite smooth loop
    if (current === images.length) {

        setTimeout(() => {

            // Remove animation
            slider.style.transition = "none";

            // Instantly go to first slide
            current = 0;

            slider.style.transform =
                `translateX(0px)`;

        }, 1000);
    }
}

// Auto slide
setInterval(changeSlide, 3000);