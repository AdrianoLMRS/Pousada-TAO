// *.sobre img-slider
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
    const prevBtnGallery = document.querySelector('.prev');
    const nextBtnGallery = document.querySelector('.next');
    const closeBtn = document.querySelector('.close');
    const popup = document.querySelector('.popup');
    const sliderImg = document.getElementById('slider-img');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentIndexGallery = 0;


function showPopup(index) {
  currentIndexGallery = index;
  sliderImg.src = galleryItems[index].src;
  popup.style.display = 'flex';
}

function closePopup() {
  popup.style.display = 'none';
}

function showNext() {
    currentIndexGallery = (currentIndexGallery + 1) % galleryItems.length;
    sliderImg.src = galleryItems[currentIndexGallery].src;
}

function showPrev() {
    currentIndexGallery = (currentIndexGallery - 1 + galleryItems.length) % galleryItems.length;
    sliderImg.src = galleryItems[currentIndexGallery].src;
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => showPopup(index));
});

closeBtn.addEventListener('click', closePopup);
nextBtnGallery.addEventListener('click', showNext);
prevBtnGallery.addEventListener('click', showPrev);

popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
});