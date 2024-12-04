// *.sobre img-slider

// *CONSTANTS
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slider.children.length - 1 : currentIndex - 1;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === slider.children.length - 1) ? 0 : currentIndex + 1;
    updateSlider();
});

function updateSlider() {
    const width = slider.clientWidth;
    slider.style.transform = `translateX(-${currentIndex * width}px)`;
};

// *Img-gallery

// *CONSTANTS
    const prevBtnGallery = document.querySelector('.prev');
    const nextBtnGallery = document.querySelector('.next');
    const closeBtn = document.querySelector('.close');
    const popup = document.querySelector('.popup');
    const sliderImg = document.getElementById('slider-img');
    const galleryItems = document.querySelectorAll('.gallery-item');

// *Golbal variable for popup 
let currentIndexGallery = 0; //! Do not change/delete

function showPopup(index) {
    // Filter imgs != .hidden
    const visibleImages = Array.from(galleryItems).filter(image => !image.classList.contains('hidden'));

    const visibleIndex = visibleImages.indexOf(galleryItems[index]); // Correct index

    if (visibleImages.length > 0 && visibleIndex !== -1) {
        // Adjust index
        currentIndexGallery = visibleIndex;
        sliderImg.src = visibleImages[visibleIndex].src;
        popup.style.display = 'flex';
    } else {
        console.error('Não há imagens visíveis.');
    }
}

function closePopup() {
    popup.style.display = 'none';
}

function showNext() {
    const visibleImages = Array.from(galleryItems).filter(image => !image.classList.contains('hidden'));

    if (visibleImages.length > 0) {
        currentIndexGallery = (currentIndexGallery + 1) % visibleImages.length;
        sliderImg.src = visibleImages[currentIndexGallery].src;
    }
}

function showPrev() {
    const visibleImages = Array.from(galleryItems).filter(image => !image.classList.contains('hidden'));

    if (visibleImages.length > 0) {
        currentIndexGallery = (currentIndexGallery - 1 + visibleImages.length) % visibleImages.length;
        sliderImg.src = visibleImages[currentIndexGallery].src;
    }
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showPopup(index));
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
});

// *  SCRIPT FOR SORTING IMAGES  *
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.gallery-Btn');
    const images = document.querySelectorAll('.gallery-item');
    const classes = ['active', 'gradient', 'gradient-golden'];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove all class styles
            buttons.forEach(btn => btn.classList.remove(...classes));
            button.classList.add(...classes);

            const category = button.getAttribute('data-category'); // For sorting imgs (Category based on class)

            // Toggle img based on category
            images.forEach(image => {
                // Need to be a class .hidden for popup to work
                if (category === 'all' || image.classList.contains(category)) {
                    image.classList.remove('hidden');
                } else {
                    image.classList.add('hidden');
                }
            });
        });
    });
});


// * Keyboard : ESC closes popup + arrowKeys move the slider *
document.addEventListener('keydown', (e) => {
    if (popup.style.display === 'flex') {  // Only if popup is visible
        try {
            // Esc key
            if (e.key === 'Escape') {
                closePopup();
            }
    
            // Arrows
            if (e.key === 'ArrowRight') {
                showNext();
            }
            if (e.key === 'ArrowLeft') {
                showPrev();
            }
        } catch (err) {
            console.log('error : ', err)
        }
    }
});