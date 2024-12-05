// Function to get URL parameters as an object
function getURLParams() {
    const params = {};
    const queryString = window.location.search.substring(1); // Remove "?"
    const pairs = queryString.split("&");

    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });

    return params;
}

// Function to autofill the form with URL parameters
function autofillForm() {
    const params = getURLParams();

    // Autofill each form field
    if (params.checkIn) document.getElementById("checkin-date").value = params.checkIn;
    if (params.checkOut) document.getElementById("checkout-date").value = params.checkOut;
    if (params.adults) document.getElementById("adults").value = params.adults;
    if (params.children) document.getElementById("children").value = params.children;
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

    // Função para validar os campos do formulário atual
    function validateCurrentStep() {
        const currentForm = steps[currentStep].querySelector('form');
        if (currentForm) {
            return currentForm.checkValidity();
        }
        return true;
    }

    // Função chamada no onclick dos botões de cada step
    window.step = function (targetStep = null) {
        if (targetStep === null) return; // Garantia de evitar navegação indesejada

        // Navegação para frente requer validação
        if (targetStep > currentStep) {
            if (!validateCurrentStep()) {
                alert("Por favor, preencha todos os campos obrigatórios antes de continuar.");
                return;
            }
        }

        // Atualiza para o step desejado
        updateStep(targetStep);
    };

    // Configuração inicial
    updateStep(0);
});





