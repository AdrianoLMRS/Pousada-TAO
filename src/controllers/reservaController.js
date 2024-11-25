// *Dependecies
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const Reserva = require('../db/models/reservaModel'); // Import reservation schema/model

  const createCheckoutSession = async (req, res) => {
      const { checkinDate, checkoutDate, adults, children } = req.body;
  
      if (!checkinDate || !checkoutDate || !adults || !children) {
          return res.status(400).json({ error: 'Faltam dados obrigatórios' });
      }
  
      const checkin = new Date(checkinDate);
      const checkout = new Date(checkoutDate);
  
      if (isNaN(checkin) || isNaN(checkout) || checkout <= checkin) {
          return res.status(400).json({ error: 'Datas de check-in e check-out inválidas' });
      }
  
      try {
          const days = (checkout - checkin) / (1000 * 3600 * 24);
          const pricePerAdult = 10000; // R$ 100,00 (centavos)
          const pricePerChild = 5000;  // R$ 50,00 (centavos)
          const totalPrice = (adults * pricePerAdult + children * pricePerChild) * days;
  
          const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items: [
                  {
                      price_data: {
                          currency: 'brl',
                          product_data: {
                              name: `Reserva para ${adults} adultos e ${children} crianças`,
                          },
                          unit_amount: totalPrice,
                      },
                      quantity: 1,
                  },
              ],
              mode: 'payment',
              success_url: `${process.env.BASE_URL}/profile/reservas`,
              cancel_url: `${process.env.BASE_URL}/reserva/canceled`,
          });
  
          // Save in MongoDB atlas
          const reserva = new Reserva({
              userId: req.user.id, // User ID with JWT token in cookies
              checkinDate,
              checkoutDate,
              adults,
              children,
              totalPrice,
              stripeSessionId: session.id,
          });
  
          await reserva.save();
  
          res.status(200).json({ sessionId: session.id });
      } catch (error) {
          console.error('Erro ao criar sessão no Stripe:', error);
          res.status(500).json({ error: 'Falha ao criar a sessão de checkout' });
      }
  };
  
  module.exports = {
      createCheckoutSession,
  };
