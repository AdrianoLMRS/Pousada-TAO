const TEST_KEY = 'pk_test_51QL7dYH40HYEkt7KrSCog4qpidBop00Nj8wYTSk8HIlPvoSWonn5FebisZkqCYn8QjYvCoDAgqQIMzQdHF3huyqr00kYLsDV9B';
const stripe = Stripe(TEST_KEY);

// Função para capturar os dados do formulário e criar a sessão de checkout
document.querySelectorAll(".stripeBtn").forEach(button => {
    button.addEventListener("click", async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do botão

        // Definindo o método de pagamento com base no botão clicado
        let selectedPaymentMethod;
        if (button.textContent.toLowerCase().includes("cartão")) {
            selectedPaymentMethod = 'card';
        } else if (button.textContent.toLowerCase().includes("pix")) {
            selectedPaymentMethod = 'pix';
        } else {
            alert("Método de pagamento desconhecido.");
            return;
        }

        const checkinInput = document.getElementById("checkIn");
        const checkoutInput = document.getElementById("checkOut");
        const adultsInput = document.getElementById("adults");
        const childrenInput = document.getElementById("children");
        const babiesInput = document.getElementById("babies");

        // Validação básica dos campos
        if (!checkinInput.value || !checkoutInput.value) {
            alert("Por favor, selecione as datas de check-in e check-out.");
            return;
        }

        if (!selectedPaymentMethod) {
            alert("Por favor, selecione um método de pagamento.");
            return;
        }

        // Formata o método de pagamento para o padrão do Stripe
        let formattedPaymentMethod;
        if (selectedPaymentMethod.toLowerCase() === 'card' || selectedPaymentMethod.toLowerCase() === 'cartão') {
            formattedPaymentMethod = 'card';
        } else if (selectedPaymentMethod.toLowerCase() === 'pix') {
            formattedPaymentMethod = 'pix';
        } else {
            alert("Método de pagamento inválido.");
            return;
        }

        const reservationData = {
            checkinDate: convertToISO(checkinInput.value),
            checkoutDate: convertToISO(checkoutInput.value),
            adults: adultsInput.value || 0,
            children: childrenInput.value || 0,
            babies: babiesInput.value || 0,
            paymentMethod: formattedPaymentMethod // Adicionado o método de pagamento
        };

        try {
            // Enviar os dados da reserva para o servidor
            const response = await fetch(`/reserva/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationData), // Envia os dados do formulário para o backend
            });

            if (!response.ok) {
                throw new Error("Falha ao criar sessão de checkout");
            }

            const { sessionId } = await response.json();

            // Redireciona o usuário para o Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });

            if (result.error) {
                console.error(result.error.message);
                alert("Erro ao redirecionar para o pagamento.");
            }
        } catch (error) {
            console.error("Erro durante o redirecionamento:", error);
            alert("Erro ao processar a reserva. Tente novamente.");
        }
    });
});