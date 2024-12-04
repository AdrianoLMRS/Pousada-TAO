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
    if (params.adultos) document.getElementById("adults").value = params.adultos;
    if (params.children) document.getElementById("children").value = params.children;
}

// Run autofillForm when the page loads
window.onload = autofillForm; 






document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    const indicators = document.querySelectorAll('.indicator');
    const steps = document.querySelectorAll('section');
    const totalSteps = steps.length;
    let currentStep = 0;

    // Atualizar o slider e os indicadores
    function updateStep(step) {
        currentStep = step;
        main.style.transform = `translateX(-${step * 33.25}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === step);
        });
    }

    // Navegar clicando nos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => updateStep(index));
    });

    // Exemplo de "completar" o passo atual
    document.querySelector('#checkout-button').addEventListener('click', function () {
        if (currentStep < totalSteps - 1) {
            updateStep(currentStep + 1);
        }
    });
});


