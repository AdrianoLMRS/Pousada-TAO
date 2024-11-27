/*

* ALL STRIPE WEBHOOKS : https://docs.stripe.com/api/events/types?shell=true&api=true

*/

// *Dependecies
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const {  createOrUpdateUser, saveReservation,  } = require('../utils/dbUtils')

  
// Handler for Stripe webhook events
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Validate the incoming webhook request
        event = stripe.webhooks.constructEvent(
            req.body, // Raw body from Stripe
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Error validating webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'customer.created':
            // Handle customer.created event
            await createOrUpdateUser(event.data.object);
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