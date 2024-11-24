console.log("FullScreen.js loaded");
document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('#tns1-ow');
  const svg = document.getElementById('fullscreen');
  const overlay = document.getElementById('overlayFull');
  
   
    function fullscreen() {
    if (img) {
      enterFullscreen()
      disableScroll()
      moveDivToEnd('.sobre-container', img.classList.toggle('fullscreen') ? '#body' : '.sobre');
      img.classList.contains('fullscreen') ? (applyFullStyles(), overlay.style.display = 'block') : (revFullStyles(), enableScroll(), exitFullscreen(), overlay.style.display = 'none');
    } else {
      console.error('Elemento img não encontrado');
    }
  }

  if (svg) {
    svg.addEventListener('click', fullscreen);
  } else {
    console.error('Elemento svg não encontrado');
  }

  function applyFullStyles() {
    document.querySelectorAll('.item').forEach(item => {
      item.style.width = '150vh'; item.style.height = '90vh'; item.style.position = 'fixed'; item.style.marginTop = '0'; item.style.boxShadow = 'none';
    });
    document.querySelectorAll('.tns-controls').forEach(control => {
      control.style.top = '-22%'; control.style.gap = '105%';
    });
    document.querySelectorAll('.tns-controls button').forEach(button => {
      button.style.transform = 'scale(1.7)';
      button.addEventListener('mouseover', () => button.style.transform = 'scale(2)');
      button.addEventListener('mouseout', () => button.style.transform = 'scale(1.7)');
    });
    const fullscreenElement = document.getElementById('fullscreen');
    if (fullscreenElement) {
      fullscreenElement.style.marginRight = '-5%'; fullscreenElement.style.marginTop = '27%';
      changeSvgSize(fullscreenElement, 30, 30);
    }
  }

  function revFullStyles() {
    document.querySelectorAll('.item').forEach(item => {
      item.style.width = ''; item.style.height = ''; item.style.position = ''; item.style.marginTop = ''; item.style.boxShadow = '';
    });
    document.querySelectorAll('.tns-controls').forEach(control => {
      control.style.top = ''; control.style.gap = '';
    });
    document.querySelectorAll('.tns-controls button').forEach(button => {
      button.style.transform = 'scale(1)'; 
      button.addEventListener('mouseover', () => button.style.transform = 'scale(1.5)'); 
      button.addEventListener('mouseout', () => button.style.transform = 'scale(1)'); 
    });
    const fullscreenElement = document.getElementById('fullscreen');
    if (fullscreenElement) {
      fullscreenElement.style.marginRight = ''; fullscreenElement.style.marginTop = '';
      changeSvgSize(fullscreenElement, 20, 20);
    }
  }
  
});

function enterFullscreen() {
  console.log('Fullscreen mode *ON*')
  if (!document.fullscreenElement) {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari e Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  }
}

function exitFullscreen() {
  console.log('Fullscreen mode *OFF*')
  if (document.fullscreenElement)  {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari e Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}

function checkDim(minWidth = 0, minHeight = 0) {
  window.addEventListener('resize', () => {
    if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
      return false;
    }
    return true;
  });

  if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
    return false;
  }
  return true;
}
