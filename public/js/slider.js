// script.js
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
}
