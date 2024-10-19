// *MY-SLIDER
// Initialize slider
function initializeSlider() {
  console.log('criando myslider');
  slider = tns({
    container: '.my-slider',
    items: 1,
    mode: 'gallery',
    axis: 'vertical',
    slideBy: "page",
    arrowKeys: true,
    viewportMax: true,
    speed: 800,
    autoplay: true,
    autoplayTimeout: 4500,
    controlsText: ["&#10094;", "&#10095"],
    controlsPosition: 'bottom',
    nav: false,
    center: true,
  });
}

// Hide the first button of the container
function hideFirstButton() {
  const firstButton = document.querySelector('#tns1-ow button:first-child');
  if (firstButton) firstButton.style.display = 'none';
}

// Adjust controls position
function adjustControlsPosition() {
  const controls = document.querySelector('.controls');
  const innerChild = document.querySelector('.item');

  if (controls && innerChild) {
    const innerChildTop = parseInt(getComputedStyle(innerChild).top, 10);
    controls.style.top = `${innerChildTop - 1000}px`;
  }
}

// Seleciona o container .sobre-container
const sobreContainer = document.querySelector('.sobre-container');