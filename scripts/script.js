document.addEventListener('DOMContentLoaded', () => {
  initializeSlider();
  adjustControlsPosition();
  hideFirstButton();
  window.addEventListener('scroll', scrollHide);
  loadSections();
  moveDivToEndAfterDelay();
  addTitleToElement('.tns-controls button[data-controls="prev"]', 'Anterior')
  addTitleToElement('.tns-controls button[data-controls="next"]', 'Próximo')
  applyBorderToImagesInDivs('.item img');
  scrollAction(() => setOpacity(1, '.sobre h1', '.sobre p', '.sobre-container'), 350);
  scrollAction(() => setOpacity(0, '.container-logo'), 2000);
});


function abc() { container_logo = document.querySelector('.container-logo') }

function scrollAction(f, n) {
  const body = document.getElementById('body'); // Referência ao elemento body
  const onScroll = () => {
    if (body.scrollTop > n) {
      f();
      body.removeEventListener('scroll', onScroll);
      console.log(`função "${f}" feita com sucesso`)
    }
  };

  body.addEventListener('scroll', onScroll); // Adiciona o listener
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



// Initialize slider
function initializeSlider() {
  console.log('criando slider');
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

// Adjust controls position
function adjustControlsPosition() {
  const controls = document.querySelector('.controls');
  const innerChild = document.querySelector('.item');

  if (controls && innerChild) {
    const innerChildTop = parseInt(getComputedStyle(innerChild).top, 10);
    controls.style.top = `${innerChildTop - 1000}px`;
  }
}

// Hide the first button of the container
function hideFirstButton() {
  const firstButton = document.querySelector('#tns1-ow button:first-child');
  if (firstButton) firstButton.style.display = 'none';
}

// Detect mobile devices
const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

// Hide sidebar on scroll
const sidebar = document.querySelector('.sidebar');
const hideSidebar = () => {
  if (sidebar) {
    sidebar.style.display = 'none';
  }
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

// Load sections
function loadSections() {
  ['navbar', 'footer', 'main'].forEach(section => loadFile(`sections/${section}.html`, section));
}

// Move a div to the end of another div
function moveDivToEnd(sourceDivId, targetDivId) {
  const sourceDiv = document.getElementById(sourceDivId);
  const targetDiv = document.getElementById(targetDivId);

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
function moveDivToEndAfterDelay() {
  console.log("DOM totalmente carregado!");
  setTimeout(() => {
    moveDivToEnd('tns1-ow', 'sobre-container');
  }, 1000);
}
