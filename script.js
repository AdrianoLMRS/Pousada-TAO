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
  loadFile('navbar.html', 'navbar');
  // loadFile('responsive-navbar\\style.css', 'body')
});
