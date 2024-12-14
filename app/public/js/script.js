document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', scrollHide);
  scrollActionReverse(() => nav.style.backgroundColor = 'var(--cor-txt)', () => nav.style.backgroundColor = '', 100);
});

const nav = document.getElementById('navbar');

// Calls some function on scrollDown
function scrollAction(f, n) {
  const onScroll = () => {
    if (document.documentElement.scrollTop > n) {
      f(); // Calls param function
      window.removeEventListener('scroll', onScroll); // Remove event listener and calls function
      console.log(`Função "${f.name}" executada com sucesso`);
    }
  };
  window.addEventListener('scroll', onScroll); // Add listener to window scroll
}

// Calls some function on scrollDown and reverse tha function on scrollUp
function scrollActionReverse(f, reverseF, n) {
  const onScroll = () => {
    if (document.documentElement.scrollTop > n) {
      f(); // Calls original function
    } else {
      reverseF(); // Calls reverse function
    }
  };
  window.addEventListener('scroll', onScroll); // Add listener to window scroll
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