// *Dependecies
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe secret key
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Stripe endpoint secret key

  const Reserva = require('../db/models/reservaModel');
  const User = require('../db/models/User');

  const express = require('express');

const router = express.Router();

router.post('/stripe',
  express.raw({type: 'application/json'}),
  async (request, response) => {

    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400).send(`Webhook Error: ${err.message}`);
      }
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

module.exports = router;