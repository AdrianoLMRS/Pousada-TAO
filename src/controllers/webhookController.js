/*
* ALL STRIPE WEBHOOKS : https://docs.stripe.com/api/events/types?shell=false&api=true
*/

// *Dependencies
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const axios = require('axios'); // Only import once
    // Utils
        const { setJWTCookie } = require('../utils/cookieUtils'); // Utility function to set JWT in cookie
        const { createOrUpdateUser, saveReservation, generateJWTToken } = require('../utils/dbUtils');

// Secret key for validating Stripe webhook signature
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const BASE_URL = process.env.BASE_URL

// Handler for Stripe webhook events
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Validate the incoming webhook request
        event = stripe.webhooks.constructEvent(
            req.body, // Raw body from Stripe
            sig,
            webhookSecret
        );
    } catch (err) {
        console.error('Error validating webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'customer.created':
            // Handle customer.created event
            try {
                const customer = event.data.object; // Customer data
        
                // Create or update the user in the database
                await createOrUpdateUser(customer);
        
                // Generate JWT token
                const token = generateJWTToken(customer.id);
        
                // Set JWT token in the cookie for the response
                setJWTCookie(res, token);

                // Optionally, call the frontend service to set the cookie in the browser
                await axios.post(`${BASE_URL}/api/set-cookie`, { token });
                
                console.log('JWT token set for customer.created event.');
            } catch (err) {
                console.error('Error handling customer.created:', err.message);
                return res.status(500).send('Error handling customer.created event.');
            }
            break;

        case 'checkout.session.completed':
            // Handle checkout.session.completed event
            const session = event.data.object;
            await saveReservation(session);

            // Create or update user if session includes customer details
            if (session.customer_details) {
                await createOrUpdateUser({
                    id: session.customer,
                    email: session.customer_details.email,
                    name: session.customer_details.name,
                    phone: session.customer_details.phone,
                    address: session.customer_details.address
                        ? `${session.customer_details.address.line1}, ${session.customer_details.address.city}, ${session.customer_details.address.country}`
                        : '',
                });
            }
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
};

module.exports = { handleStripeWebhook };