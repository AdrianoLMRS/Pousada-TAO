// *Dependecies
  const path = require('path'); // Path for folders
  require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Calculate total price for the reservation
const calculateTotalPrice = (days, adults, children) => {
  const pricePerAdult = 10000; // R$ 100,00 (in cents)
  const pricePerChild = 5000;  // R$ 50,00 (in cents)
  return (adults * pricePerAdult + children * pricePerChild) * days;
};

// Validate reservation dates and return the number of days
const validateDates = (checkinDate, checkoutDate) => {
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  if (isNaN(checkin) || isNaN(checkout) || checkout <= checkin) {
      throw new Error('Invalid check-in and check-out dates.');
  }

  const days = (checkout - checkin) / (1000 * 3600 * 24);
  return { checkin, checkout, days };
};

// Create a Stripe checkout session
const createStripeSession = async (totalPrice, checkin, checkout, adults, children) => {
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
      success_url: `${process.env.BASE_URL}/profile/reservas`,
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
  });
};

module.exports = {
  calculateTotalPrice,
  validateDates,
  createStripeSession,
}