document.addEventListener('DOMContentLoaded', function() {
  activateElement('.depo-slider', 3);

  setInterval(function() {
    // Move o primeiro elemento para o final do contêiner
    const depoSlider = document.querySelector('.depo-slider');
    depoSlider.appendChild(depoSlider.firstElementChild);
    
    // Ativa os três primeiros elementos após a movimentação
    activateElement('.depo-slider', 3);
  }, 4000);
});

function activateElement(element, number) {
  const container = document.querySelector(element);
  const items = container.children;

  // Remove a classe 'active' de todos os elementos
  for (let item of items) {
    item.classList.remove('active');
  }

  // Ativa apenas os três primeiros elementos
  for (let i = 0; i < Math.min(number, items.length); i++) {
    items[i].classList.add('active');
  }
}




// queue.push(2);         // queue is now [2]
// queue.push(5);         // queue is now [2, 5]
// var i = queue.shift(); // queue is now [5]



  