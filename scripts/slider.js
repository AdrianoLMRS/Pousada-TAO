const currentTranslations = {};
const items = document.querySelectorAll('.depo-slider .item-depo');

let iterationCount = 0; 
let maxCount;
let percentValue;
 
function updateVariables() {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 850) { // Tela grande
    percentValue = 108;
    maxCount = items.length - 3;
  } else if (screenWidth >= 650) { // Tela média
    percentValue = 105.2
    maxCount = items.length - 2;
  } else { // Tela pequena
    percentValue = 102.4
    maxCount = items.length - 1;
  }

  iterationCount = Math.min(iterationCount, maxCount);
}

function updateButtonVisibility() {
  const nextButton = document.getElementById('next-button');
  const prevButton = document.getElementById('prev-button');

  // Torna o botão 'next' invisível e não interativo quando estamos no começo (mínimo)
  if (iterationCount === 0) {
    nextButton.style.visibility = 'hidden';
    nextButton.style.pointerEvents = 'none';
  } else {
    nextButton.style.visibility = 'visible';
    nextButton.style.pointerEvents = 'auto';
  }

  // Torna o botão 'prev' invisível e não interativo quando estamos no final (máximo)
  if (iterationCount === maxCount) {
    prevButton.style.visibility = 'hidden';
    prevButton.style.pointerEvents = 'none';
  } else {
    prevButton.style.visibility = 'visible';
    prevButton.style.pointerEvents = 'auto';
  }
}

function applyTranslateX(element, value) {
  element.style.transform = `translateX(${value})`;
}

function nextItem() {
  if (iterationCount < maxCount) {
    iterationCount++;

    items.forEach((item, index) => {
      if (!currentTranslations[index]) {
        currentTranslations[index] = 0;
      }
      currentTranslations[index] -= percentValue;
      applyTranslateX(item, currentTranslations[index] + '%');
    });
    updateButtonVisibility();
  } else {
    console.log("Limite máximo alcançado.");
  }
}

function prevItem() {
  if (iterationCount > 0) {
    iterationCount--;

    items.forEach((item, index) => {
      if (!currentTranslations[index]) {
        currentTranslations[index] = 0;
      }
      currentTranslations[index] += percentValue;
      applyTranslateX(item, currentTranslations[index] + '%');
    });
    updateButtonVisibility();
  } else {
    console.log("Limite mínimo alcançado.");
  }
}

updateButtonVisibility();
updateVariables();
window.addEventListener('resize', () => {
  // Chama applyTranslateX para cada item, passando '0%' para cada um
  items.forEach((item) => {
    item.style.transform = '';
  });
  
  updateVariables();
  updateButtonVisibility();

});

