document.addEventListener('DOMContentLoaded', function() {
  var slider = tns({
      container: '.my-slider',
      items: 1,
      gutter: 10,
      mode: 'gallery',
      slideBy: "page",
      mouseDrag: true,
      viewportMax: true,
      speed: 400,
      autoplay: true,
      autoplayTimeout: 4500,
      controlsText: ["&#10094;", "&#10095"],
      controlsPosition: 'bottom',
      nav: false,
      center: true,
  });

  // Função para centralizar as imagens
  function centerImages() {
      const items = document.querySelectorAll('.item img');
      items.forEach(img => {
          // Ajusta a imagem para preencher o espaço disponível sem esticar
          img.style.maxWidth = '100%';
          img.style.maxHeight = '100%';
          img.style.objectFit = 'contain'; // Para manter a proporção
          img.style.display = 'block'; // Para evitar espaços em branco abaixo da imagem
          img.style.margin = 'auto'; // Para centralizar a imagem
      });
  }

  // Chama a função ao carregar e ao redimensionar a janela
  centerImages();
  window.addEventListener('resize', centerImages);
});


document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o innerchild
const innerChild = document.querySelector('.item');
// Seleciona o elemento que deseja ajustar
const cont = document.querySelector('.controls');

// Pega o valor do 'top' do innerchild
const innerChildStyle = getComputedStyle(innerChild);
const innerChildTop = parseInt(innerChildStyle.top, 10);

// Ajusta o 'top' do outerElement
cont.style.top = `${innerChildTop - 1000}px`;

});
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona o primeiro botão dentro do contêiner #tns1-ow
  var firstButton = document.querySelector('#tns1-ow button:first-child');
  
  // Verifica se o botão foi encontrado e aplica o estilo display: none
  if (firstButton) {
    firstButton.style.display = 'none';
  }
});


function jquery(){
  $(document).ready(function() {
    console.log("jQuery está funcionando!");
});
}
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
function scrollHide() {
  window.addEventListener('scroll', function() {
      if (isMobile()) {
          hideSidebar();
      
      }
  });
}
function showSidebar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSidebar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}

// Função para carregar conteúdo de outro arquivo HTML
function loadFile(file_name, element_id) {
  fetch(file_name)  // Carrega o arquivo HTML
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo: ' + response.statusText);
      }
      return response.text(); // Converte o conteúdo em texto
    })
    .then(data => {
      document.getElementById(element_id).innerHTML = data; // Insere o conteúdo na tag específica
    })
    .catch(error => console.error('Erro ao carregar arquivo:', error));
}

// Chama a função para carregar a navbar no elemento <nav> com id="navbar"
document.addEventListener('DOMContentLoaded', function() {
  scrollHide();
  loadFile('sections/navbar.html', 'navbar');
  loadFile('sections/footer.html', 'footer');
  loadFile('sections/main.html', 'main')
});
