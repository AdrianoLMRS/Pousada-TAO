document.addEventListener('DOMContentLoaded', () => {
  initializeSlider();
  adjustControlsPosition();
  hideFirstButton();
  window.addEventListener('scroll', scrollHide);
  moveDivToEndAfterDelay('#tns1-ow', '#sobre-container', 100);
  moveDivToEndAfterDelay('#fullscreen', '.tns-controls', 100);
  addTitleToElement('.tns-controls button[data-controls="prev"]', 'Anterior');
  addTitleToElement('.tns-controls button[data-controls="next"]', 'Próximo');
  addTitleToElement('#fullscreen', 'Tela Cheia');
  applyBorderToImagesInDivs('.item img');
  scrollAction(() => setOpacity(1, '.sobre h1', '.sobre h2', '.sobre p', '.sobre-container'), 500);
  scrollActionReverse(() => nav.style.backgroundColor = 'var(--cor-txt)', () => nav.style.backgroundColor = '', 550);
  // window.addEventListener('resize', escalarElemento('.sobre button', 100, 100))
});



const nav = document.getElementById('navbar');

function abc() { container_logo = document.querySelector('.container-logo') }

function scrollAction(f, n) {
  const onScroll = () => {
    if (document.documentElement.scrollTop > n) {
      f();
      window.removeEventListener('scroll', onScroll); // Remove o listener ao acionar a função
      console.log(`Função "${f.name}" executada com sucesso`);
    }
  };

  window.addEventListener('scroll', onScroll); // Adiciona o listener no scroll da janela
}


function scrollActionReverse(f, reverseF, n) {
  const onScroll = () => {
    if (document.documentElement.scrollTop > n) {
      f(); // Chama a função original
    } else {
      reverseF(); // Chama a função reversa
    }
  };

  window.addEventListener('scroll', onScroll); // Listener no scroll da janela
}


function setOpacity(opacityValue, ...selectors) {
  // Itera sobre cada seletor fornecido
  selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector); // Seleciona todos os elementos que correspondem ao seletor

      elements.forEach(element => {
          element.style.opacity = opacityValue; // Define a opacidade do elemento
      });
  });
}

// Função para adicionar um título a um elemento pelo seletor
function addTitleToElement(selector, titleText) {
  // Obtém o elemento usando um seletor CSS
  const element = document.querySelector(selector);

  // Verifica se o elemento existe
  if (element) {
    // Adiciona o atributo title com o texto fornecido
    element.title = titleText;
    console.log(`Título adicionado ao elemento com seletor "${selector}": "${titleText}"`);
  } else {
    console.error(`Elemento com seletor "${selector}" não encontrado.`);
  }
}

function applyBorderToImagesInDivs(div) {
  // Seleciona todas as divs com a classe 'item' e as imagens dentro delas
  const images = document.querySelectorAll(div);

  // Itera sobre todas as imagens e aplica uma borda ou qualquer outro estilo
  images.forEach(image => {
    image.style.border = '4px solid white'; // Aqui você pode modificar a borda ou aplicar outras estilizações
  });
}

// Detect mobile devices
const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

const showSidebar = () => {
  document.querySelector('.sidebar').style.display = 'flex'; // ou 'flex', conforme necessário
};

const hideSidebar = () => {
  document.querySelector('.sidebar').style.display = 'none';
};



const scrollHide = () => {
  if (isMobile()) hideSidebar();
};

// Load content from another HTML file
function loadFile(file_name, element_id) {
  fetch(file_name)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar o arquivo: ' + response.statusText);
      return response.text();
    })
    .then(data => {
      const element = document.getElementById(element_id);
      if (element) {
        element.innerHTML = data;
      }
    })
    .catch(error => console.error('Erro ao carregar arquivo:', error));
}

// Move a div to the end of another div
function moveDivToEnd(sourceDivId, targetDivId) {
  const sourceDiv = document.querySelector(sourceDivId);
  const targetDiv = document.querySelector(targetDivId);

  console.log("sourceDiv:", sourceDiv);
  console.log("targetDiv:", targetDiv);

  if (sourceDiv && targetDiv) {
    targetDiv.appendChild(sourceDiv);
    console.log("Div movido com sucesso!");
  } else {
    console.error('Um ou ambos os divs não foram encontrados.');
  }
}

// Move div after delay
function moveDivToEndAfterDelay(d1, d2, delay) {
  console.log("DOM totalmente carregado!");
  setTimeout(() => {
    moveDivToEnd(d1, d2);
  }, delay);
}

function changeSvgSize(svgElement, newWidth, newHeight) {
  svgElement.setAttribute('width', newWidth);
  svgElement.setAttribute('height', newHeight);
}

// function executeEveryXPixels(x, y, f) {
//   let lastWidth = window.innerWidth;

//   function checkExecution() {
//       const currentWidth = window.innerWidth;

//       if (x < 0)
//         if (currentWidth <= y) {
//             if ((x > 0 && currentWidth >= lastWidth + x) || (x < 0 && currentWidth <= lastWidth + x)) {
//                 f();
//                 lastWidth = currentWidth;
//             }
//         }
//       if (x >= 0)
//         if (currentWidth >= y) {
//             if ((x > 0 && currentWidth >= lastWidth + x) || (x < 0 && currentWidth <= lastWidth + x)) {
//                 f();
//                 lastWidth = currentWidth;
//             }
//         }
//   }

//   window.addEventListener('resize', checkExecution);
// }

// function applyMediaQueryStyles(selector, media, change) {
//   const element = document.querySelector(selector);

//   // Crie uma media query
//   const mediaQuery = window.matchMedia(media);

//   function handleMediaChange(e) {
//       if (e.matches) {
//           change(element)
//       } else {
//           return;
//       }
//   }

//   handleMediaChange(mediaQuery);

//   mediaQuery.addEventListener('change', handleMediaChange);
// }

function preventDefault(e) {
  e.preventDefault();
}

// Chama essa função para desativar o scroll
function disableScroll() {
  window.addEventListener('wheel', preventDefault, { passive: false });
  window.addEventListener('touchmove', preventDefault, { passive: false });
}

// Chama essa função para ativar o scroll
function enableScroll() {
  window.removeEventListener('wheel', preventDefault);
  window.removeEventListener('touchmove', preventDefault);
}

function escalarElemento(seletor, escalaLarguraPercent, escalaAlturaPercent) {
  const elemento = document.querySelector(seletor);
  if (elemento) {
      // Obtém as dimensões da tela do usuário
      const larguraTela = window.innerWidth;
      const alturaTela = window.innerHeight;

      // Calcula a escala com base nas porcentagens fornecidas
      const escalaLargura = escalaLarguraPercent / 100;
      const escalaAltura = escalaAlturaPercent / 100;

      // Aplica a transformação de escala ao elemento
      elemento.style.transform = `scale(${escalaLargura}, ${escalaAltura})`;
  } else {
      console.error('Elemento não encontrado:', seletor);
  }
}
