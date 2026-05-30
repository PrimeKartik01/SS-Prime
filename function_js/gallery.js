// gallery.js

export function initLuxuryGallery({
    galleryId,
    modalId,
    images,
}) {

    let currentGalleryIndex = 0;

    const grid = document.getElementById(galleryId);

    const modal = document.getElementById(modalId);

    const modalImage = modal.querySelector('.gallery-modal-image');

    const modalCaption = modal.querySelector('.gallery-modal-caption');

    const modalDots = modal.querySelector('.gallery-modal-dots');

    /* ---------- Build Grid ---------- */

    images.forEach((item, index) => {

        const isWide = index === 0 || index === 3;

        const wrapper = document.createElement('div');

        wrapper.className = isWide ? 'lg:col-span-2' : '';

        wrapper.innerHTML = `
            <div class="group relative h-[320px] cursor-pointer overflow-hidden rounded-3xl">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                >

                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div class="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6">

                    <div>

                        <h3 class="text-xl font-semibold">
                            ${item.title}
                        </h3>

                        <p class="mt-1 text-sm text-white/70">
                            Click to view
                        </p>

                    </div>

                    <div class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition duration-300 group-hover:bg-[#c8a46b] group-hover:text-black">
                        ⤢
                    </div>

                </div>

            </div>
        `;

        wrapper.addEventListener('click', () => {
            openGallery(index);
        });

        grid.appendChild(wrapper);

    });

    /* ---------- Dots ---------- */

    function buildDots() {

        modalDots.innerHTML = '';

        images.forEach((_, i) => {

            const dot = document.createElement('div');

            dot.className =
                `h-2 w-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentGalleryIndex
                        ? 'bg-[#c8a46b] scale-125'
                        : 'bg-white/30'
                }`;

            dot.addEventListener('click', () => {

                currentGalleryIndex = i;

                updateModal();

            });

            modalDots.appendChild(dot);

        });

    }

    /* ---------- Preload ---------- */

    function preloadNext(index) {

        const nextIndex = (index + 1) % images.length;

        const img = new Image();

        img.src = images[nextIndex].image;

    }

    /* ---------- Update Modal ---------- */

    function updateModal() {

        const item = images[currentGalleryIndex];

        modalImage.style.opacity = '0';

        modalImage.style.transform = 'scale(0.96)';

        setTimeout(() => {

            modalImage.src = item.image;

            modalCaption.textContent = item.title;

            modalImage.style.opacity = '1';

            modalImage.style.transform = 'scale(1)';

            buildDots();

            preloadNext(currentGalleryIndex);

        }, 150);

    }

    /* ---------- Open ---------- */

    function openGallery(index) {

        currentGalleryIndex = index;

        modal.classList.remove('hidden');

        modal.classList.add('flex');

        document.body.style.overflow = 'hidden';

        updateModal();

    }

    /* ---------- Close ---------- */

    function closeGallery() {

        modal.classList.add('hidden');

        modal.classList.remove('flex');

        document.body.style.overflow = '';

    }

    /* ---------- Navigation ---------- */

    function changeGalleryImage(dir) {

        currentGalleryIndex =
            (currentGalleryIndex + dir + images.length) %
            images.length;

        updateModal();

    }

    /* ---------- Buttons ---------- */

    modal
        .querySelector('.gallery-close-btn')
        .addEventListener('click', closeGallery);

    modal
        .querySelector('.gallery-prev-btn')
        .addEventListener('click', () => {
            changeGalleryImage(-1);
        });

    modal
        .querySelector('.gallery-next-btn')
        .addEventListener('click', () => {
            changeGalleryImage(1);
        });

    /* ---------- Backdrop ---------- */

    modal.addEventListener('click', (e) => {

        if (e.target === modal) {

            closeGallery();

        }

    });

    /* ---------- Keyboard ---------- */

    document.addEventListener('keydown', (e) => {

        if (modal.classList.contains('hidden')) return;

        if (e.key === 'ArrowRight') {
            changeGalleryImage(1);
        }

        if (e.key === 'ArrowLeft') {
            changeGalleryImage(-1);
        }

        if (e.key === 'Escape') {
            closeGallery();
        }

    });

}