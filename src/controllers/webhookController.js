const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Reservation = require('../db/models/reservaModel');
const User = require('../db/models/User'); // Imports User model

const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body, // Stripe raw body
            sig,
            process.env.STRIPE_WEBHOOK_SECRET // Webhook secret Key
        );
    } catch (err) {
        console.error('Erro ao validar webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {

        const session = event.data.object; // session data for reservas collection
        const customer = session.customer_details; // Customer data for users collection

        console.log("SESSION :\n", session) // For debug
        console.log('Session customer ID: ', session.customer); // For debug
        console.log("CUSTOMER :\n", customer) // For debug

        // Verify if session customer is valid
        if (!session.customer) {
          console.error('Erro: session.customer não foi encontrado.');
          return res.status(400).send('Erro: session.customer não foi encontrado.');
        }

        // Session data
        const reservationData = {
          checkIn: session.metadata.checkIn,
          checkOut: session.metadata.checkOut,
          adults: parseInt(session.metadata.adultos, 10),
          children: parseInt(session.metadata.criancas, 10),
          totalAmount: session.amount_total / 100, // Value in BRL ( reais )
          stripeSessionId: session.id, // Stripe session ID
          customerId: session.customer, // Stripe customer ID
          paymentStatus: session.payment_status,
        };

        // Define userData based on customer data
        const userData = {
          email: customer.email,
          name: customer.name,
          phone: customer.phone,
          address: customer.address ? `${customer.address.line1}, ${customer.address.city}, ${customer.address.country}` : '',
          customerId: session.customer, // Stripe customer ID
        };

        try {
            
            const reservation = new Reservation(reservationData) // Save session data in reservations collection
            await reservation.save();

            console.log('Reserva salva com sucesso:', reservation);

            let user = await User.findOne({ customerId: session.customer }); // CustomerId is unique

            if (!user) {
              // Create new user if not exist
              user = new User(userData);
            } else {
                // Update existing user
                user.email = customer.email,
                user.name = customer.name;
                user.phone = customer.phone;
                user.address = customer.address ? `${customer.address.line1}, ${customer.address.city}, ${customer.address.country}` : '';
            }

            await user.save();
            console.log('Usuário salvo ou atualizado com sucesso:', user);

        } catch (err) {
            console.error('Erro ao salvar reserva no MongoDB:', err);
        }
    }

    res.status(200).json({ received: true });
};

module.exports = { handleStripeWebhook };