document.addEventListener('DOMContentLoaded', () => {
  initializeSlider();
  adjustControlsPosition();
  hideFirstButton();
  window.addEventListener('scroll', scrollHide);
  loadSections();
  moveDivToEndAfterDelay();
  addTitleToElement('.tns-controls button[data-controls="prev"]', 'Anterior')
  addTitleToElement('.tns-controls button[data-controls="next"]', 'Próximo')
  addTooltipWithDelay('about-button', '2000')
});

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

function addTooltipWithDelay(elementId, delay) {
  const button = document.getElementById(elementId);

  if (!button) {
    console.error(`Elemento com ID "${elementId}" não encontrado.`);
    return;
  }

  let tooltipTimeout;

  // Define o texto do tooltip
  button.setAttribute('data-tooltip', elementId === 'prevButton' ? 'Anterior' : 'Próximo');

  button.addEventListener('mouseenter', () => {
    tooltipTimeout = setTimeout(() => {
      button.classList.add('show-tooltip'); // Adiciona a classe para mostrar o tooltip
    }, delay); // Usa o tempo de delay fornecido
  });

  button.addEventListener('mouseleave', () => {
    clearTimeout(tooltipTimeout); // Limpa o timeout se o mouse sair
    button.classList.remove('show-tooltip'); // Remove a classe para esconder o tooltip
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
