/**
 * carousel animation
 * couse setInterval to run every 3 seconds, allowing 2 seconds for the image to be displayed and 1 second for the transition animation 
 */
const images = [
    "images/homepage_building.avif",
    "images/building.jpg",
];

const slider = document.getElementById("slider");

// Duplicate first image at end
const allImages = [...images, images[0]];

allImages.map((img) => {
    slider.innerHTML += `
            <img 
                src="${img}" 
                class="w-140 h-200 object-cover flex-shrink-0"
                alt=""
            >
        `;
});

let current = 0;

function changeSlide() {

    current++;

    slider.style.transition = "transform 1s ease-in-out";
    slider.style.transform = `translateX(-${current * 35}rem)`;

    // When duplicate image comes
    if (current === images.length) {

        setTimeout(() => {

            // Remove animation
            slider.style.transition = "none";

            // Jump instantly to first image
            current = 0;
            slider.style.transform = `translateX(0)`;

        }, 1000);
    }
}

// Wait 2 sec + 1 sec animation
setInterval(changeSlide, 3000);

