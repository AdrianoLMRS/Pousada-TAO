document.addEventListener("DOMContentLoaded", () => {
    // Obter os parâmetros da URL
    const params = new URLSearchParams(window.location.search);

    // Função para preencher os campos do formulário
    const autofillForm = () => {
        document.getElementById("checkIn").value = params.get("checkIn") || "";
        document.getElementById("checkOut").value = params.get("checkOut") || "";
        document.getElementById("adults").value = params.get("adults") || 1;
        document.getElementById("children").value = params.get("children") || 0;
        document.getElementById("babies").value = params.get("babies") || 0;

    };

    autofillForm();
});

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