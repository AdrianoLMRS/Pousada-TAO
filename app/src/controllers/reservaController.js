// *Dependencies
    const path = require('path');
    require('dotenv').config({ path: path.join(__dirname, '../.env') });
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const { calculateTotalPrice, validateDates } = require('../utils/reservaUtils');
    const { decodeJWT } = require('../utils/cookieUtils');

// Function to create a session when customerId exists (using customerId)
async function sessionWithId(customerId, totalPrice, checkin, checkout, adults, children) {
    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: `Reserva para ${adults} adultos e ${children} crianças`,
                        description: `Check-In: ${checkin.toLocaleDateString('pt-BR')}, Check-Out: ${checkout.toLocaleDateString('pt-BR')}`,
                    },
                    unit_amount: totalPrice,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/api/set-cookies?cs={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/reserva/canceled`,
        metadata: {
            checkIn: checkin.toLocaleDateString('pt-BR'),
            checkOut: checkout.toLocaleDateString('pt-BR'),
            adultos: adults,
            criancas: children,
        },
        customer: customerId,
        phone_number_collection: {
            enabled: true,
        },
        locale: 'pt', 
        custom_text: {
            submit: {
            message: 'Pagar Agora',
            },
        },
    });
}

// Function to create a session without customerId (normal session)
async function sessionNormal(totalPrice, checkin, checkout, adults, children) {
    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: `Reserva para ${adults} adultos e ${children} crianças`,
                        description: `Check-In: ${checkin.toLocaleDateString('pt-BR')}, Check-Out: ${checkout.toLocaleDateString('pt-BR')}`,
                    },
                    unit_amount: totalPrice,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/api/set-cookies?cs={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/reserva/canceled`,
        metadata: {
            checkIn: checkin.toLocaleDateString('pt-BR'),
            checkOut: checkout.toLocaleDateString('pt-BR'),
            adultos: adults,
            criancas: children,
        },
        customer_creation: 'always', // Always create a Stripe customer
        phone_number_collection: {
            enabled: true, // Collect phone number
        },
        locale: 'pt', // Idioma português
        custom_text: {
            submit: {
            message: 'Pagar Agora',
            },
        },
    });
}

// Controller function to handle creating a checkout session
const createCheckoutSession = async (req, res) => {
    const { checkinDate, checkoutDate, adults, children } = req.body;

    if (!checkinDate || !checkoutDate || !adults || !children) {
        return res.status(400).json({ error: 'Faltam dados obrigatórios.' });
    }

    try {
        // Validate and calculate
        const { checkin, checkout, days } = validateDates(checkinDate, checkoutDate);
        const totalPrice = calculateTotalPrice(days, adults, children);

        // Decode JWT and extract customerId
        let customerId = null;
        try {
            const decodedToken = decodeJWT(req, 'authToken');
            customerId = decodedToken.customerId; // Extract customerId from decoded token
        } catch (err) {
            console.log('Token invalid or missing, proceeding without customerId.\n', err);
        }

        let session;

        // If customerId exists, create session with customerId
        if (customerId) {
            session = await sessionWithId(customerId, totalPrice, checkin, checkout, adults, children);
        } else {
            // If no customerId, create session without it
            session = await sessionNormal(totalPrice, checkin, checkout, adults, children);
        }

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error.message);
        res.status(500).json({ error: 'Falha ao criar a sessão de checkout.' });
    }
};

module.exports = { createCheckoutSession };
