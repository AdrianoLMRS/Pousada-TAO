// Function to get URL parameters
function getURLParams() {
    // Create a new URLSearchParams object from the current window's URL
    const params = new URLSearchParams(window.location.search);
    const paramsObject = {};

    // Loop through all the parameters and add them to the object
    params.forEach((value, key) => {
        paramsObject[key] = value;
    });

    // Return the object with URL parameters
    return paramsObject;
}

// Function to autofill the form with URL parameters
function autofillForm() {
    const params = getURLParams();

    // Autofill each form field
    if (params.checkIn) document.getElementById("checkin-date").value = params.checkIn;
    if (params.checkOut) document.getElementById("checkout-date").value = params.checkOut;
    if (params.adults) document.getElementById("adults").value = params.adults;
    if (params.children) document.getElementById("children").value = params.children;
    if (params.babies) document.getElementById("babies").value = params.babies;
}

// Run autofillForm when the page loads
window.onload = autofillForm; 





let currentStep = 0;
document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    const indicators = document.querySelectorAll('.indicator');
    const steps = document.querySelectorAll('section');
    const totalSteps = steps.length;

    const prevArrow = document.querySelector('#prev-arrow');
    const nextArrow = document.querySelector('#next-arrow');

    // Função para atualizar slider, indicadores e setas
    function updateStep(step) {
        currentStep = step;
        main.style.transform = `translateX(-${step * 33.33}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === step);
            indicator.classList.toggle('visited', index <= step);
        });

        prevArrow.disabled = currentStep === 0;
        nextArrow.disabled = currentStep === totalSteps - 1;
    }

    // Função para validar os campos de um passo específico
    function validateStep(stepIndex) {
        const stepForm = steps[stepIndex]?.querySelector('form');
        if (stepForm) {
            // Verificar se o formulário tem botões com a classe 'square'
            const paymentButtons = stepForm.querySelectorAll('.square');
            const isPaymentSelected = Array.from(paymentButtons).some(button => button.classList.contains('active'));

            // Caso seja o formulário de pagamento, verificar se há uma seleção
            if (stepForm.id === 'payment-form' && !isPaymentSelected) {
                return false;
            }

            // Caso não seja um formulário de pagamento, verificar apenas a validade
            return stepForm.checkValidity();
        }
        return true;
    }

    // Função chamada no onclick dos botões de cada step
    window.step = function (targetStep = null) {
        if (targetStep === null) return; // Garantia de evitar navegação indesejada

        // Caso esteja avançando, validar todos os passos intermediários
        if (targetStep > currentStep) {
            for (let i = currentStep; i < targetStep; i++) {
                if (!validateStep(i)) {
                    alert("Por favor, preencha todos os campos obrigatórios antes de continuar.");
                    return;
                }
            }
        }

        // Atualiza para o step desejado
        updateStep(targetStep);
    };
});



// JavaScript to handle the increment and decrement functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.quantity').forEach(quantityContainer => {
        const input = quantityContainer.querySelector('input[type="number"]');
        const btnUp = quantityContainer.querySelector('.quantity-up');
        const btnDown = quantityContainer.querySelector('.quantity-down');
        
        const min = parseFloat(input.getAttribute('min')) || 0;
        const max = parseFloat(input.getAttribute('max')) || Infinity;
      
        btnUp.addEventListener('click', () => {
            let value = parseFloat(input.value) || min;
            if (value < max) {
                input.value = value + 1;
                input.dispatchEvent(new Event('change'));
            }
        });
      
        btnDown.addEventListener('click', () => {
            let value = parseFloat(input.value) || min;
            if (value > min) {
                input.value = value - 1;
                input.dispatchEvent(new Event('change'));
            }
        });

        input.addEventListener('blur', () => {
            let value = parseFloat(input.value) || min;
            input.value = Math.max(min, Math.min(value, max));
        });
    });
})
  

