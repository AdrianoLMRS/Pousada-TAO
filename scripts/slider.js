const currentTranslations = {};
const items = document.querySelectorAll('.depo-slider .item-depo');
const maxCount = items.length - 3;
let iterationCount = 0; 

function applyTranslateX(element, value) {
  element.style.transform = `translateX(${value})`;
}

function prevItem() {
  // Incrementa o contador até o limite do maxCount
  if (iterationCount < maxCount) {
    iterationCount++;

    items.forEach((item, index) => {
      // Inicializa o deslocamento, se necessário
      if (!currentTranslations[index]) {
        currentTranslations[index] = 0;
      }
      // Move cada item -108% adicional
      currentTranslations[index] -= 108;
      applyTranslateX(item, currentTranslations[index] + '%');
    });
  } else {
    console.log("Limite mínimo alcançado.");
  }
}

function nextItem() {
  // Decrementa o contador até 0
  if (iterationCount > 0) {
    iterationCount--;

    items.forEach((item, index) => {
      // Inicializa o deslocamento, se necessário
      if (!currentTranslations[index]) {
        currentTranslations[index] = 0;
      }
      // Move cada item +108% para retornar
      currentTranslations[index] += 108;
      applyTranslateX(item, currentTranslations[index] + '%');
    });
  } else {
    console.log("Limite máximo alcançado.");
  }
}





  