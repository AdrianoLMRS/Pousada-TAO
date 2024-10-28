// document.addEventListener('DOMContentLoaded', function() {
//   activateElement('.depo-slider', 3);

//   setInterval(function() {

//     const depoSlider = document.querySelector('.depo-slider');
//     depoSlider.appendChild(depoSlider.firstElementChild);
//     for (let item of depoSlider) {
//       item.classList.toggle('shift-left');
//     }
//     setTimeout(() => {
//       activateElement('.depo-slider', 3);
//     }, 200);
    

//     for (let item of depoSlider) {
//       item.classList.remove('shift-left');
//     }
//   }, 4200);
// });

// function activateElement(element, number) {
//   const container = document.querySelector(element);
//   const items = container.children;

//   // Remove a classe 'active' de todos os elementos
//   for (let item of items) {
//     item.classList.remove('active');
//   }

//   // Ativa apenas os três primeiros elementos
//   for (let i = 0; i < Math.min(number, items.length); i++) {
//     items[i].classList.add('active');
//   }
// }




// queue.push(2);         // queue is now [2]
// queue.push(5);         // queue is now [2, 5]
// var i = queue.shift(); // queue is now [5]

// Armazena o deslocamento atual para cada item


// Armazena o deslocamento atual para cada item


// Armazena o deslocamento atual para cada item


const currentTranslations = {};
const items = document.querySelectorAll('.depo-slider .item-depo');
const maxCount = items.length - 3; // Calcula o máximo permitido

document.addEventListener('DOMContentLoaded', function() {
  let iterationCount = 0; // Contador de iterações

  const intervalId = setInterval(() => {
    iterationCount++;

    // Executa a transformação até o maxCount
    if (iterationCount <= maxCount) {
      items.forEach((item, index) => {
        // Verifica se o item já tem um valor de deslocamento armazenado
        if (!currentTranslations[index]) {
          currentTranslations[index] = 0; // Inicializa com 0 se não estiver definido
        }
        // Atualiza o deslocamento e aplica o novo valor
        currentTranslations[index] -= 108; // Adiciona -108
        applyTranslateX(item, currentTranslations[index] + '%'); // Aplica a transformação diretamente no item
      });
    } else {
      // Para o intervalo após atingir o maxCount
      clearInterval(intervalId); // Para o setInterval
    }
  }, 4000);
});

function applyTranslateX(element, value) {
  element.style.transform = `translateX(${value})`;
}





  