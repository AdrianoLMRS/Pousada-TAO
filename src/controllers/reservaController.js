// *Dependencies
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { calculateTotalPrice, validateDates } = require('../utils/reservaUtils');
const jwt = require('jsonwebtoken');

// Function to decode the JWT token from the cookie and return the decoded data
function decodeAuthToken(req) {
    const token = req.cookies.authToken; // Get the authToken from the cookie

    if (!token) {
        throw new Error('No token found');
    }

    try {
        // Decode the JWT token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; // Return the decoded data
    } catch (error) {
        throw new Error('Error decoding token: ' + error.message);
    }
}

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
            enabled: true, // Collect phone number
        },
    });
}

// Function to create a session without customerId (normal session)
async function sessionNormal(totalPrice, checkin, checkout, adults, children, email, name, phone, address) {
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
        customer_email: email, // Collect email
        phone_number_collection: {
            enabled: true, // Collect phone number
        },
    });
}

// Controller function to handle creating a checkout session
const createCheckoutSession = async (req, res) => {
    const { checkinDate, checkoutDate, adults, children, email, name, phone, address } = req.body;

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
            const decodedToken = decodeAuthToken(req);
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
            session = await sessionNormal(totalPrice, checkin, checkout, adults, children, email, name, phone, address);
        }

        res.status(200).json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error.message);
        res.status(500).json({ error: 'Falha ao criar a sessão de checkout.' });
    }
};

module.exports = { createCheckoutSession };
