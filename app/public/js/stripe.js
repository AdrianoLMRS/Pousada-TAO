const TEST_KEY = 'pk_test_51QL7dYH40HYEkt7KrSCog4qpidBop00Nj8wYTSk8HIlPvoSWonn5FebisZkqCYn8QjYvCoDAgqQIMzQdHF3huyqr00kYLsDV9B';
const BASE_URL = `${window.location.protocol}//${window.location.host}`;
const stripe = Stripe(TEST_KEY);

// Função para capturar os dados do formulário e criar a sessão de checkout
document.getElementById("checkout-button").addEventListener("click", async () => {
const form = document.getElementById("reservation-form");
const formData = new FormData(form);

const reservationData = {
    checkinDate: formData.get("checkin-date"),
    checkoutDate: formData.get("checkout-date"),
    adults: formData.get("adults"),
    children: formData.get("children")
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
    }
} catch (error) {
    console.error("Erro durante o redirecionamento:", error);
}
});
// console.log("Response:", response);
// const data = await response.json();
// console.log("Session ID:", data.sessionId);