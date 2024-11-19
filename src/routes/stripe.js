// const express = require('express');
// const router = Router();

// // STRIPE requirements
// require('dotenv').config(); // Load .env
// const STRIPE_KEY = process.env.STRIPE_SECRET_KEY

// const stripe = require('stripe')(STRIPE_KEY);

// import { Cache, Reservation } from '../db/models/db_model'; // Import both models

// // Create Stripe session + save user data in the cache
// router.post('/create-checkout-session', async (req, res) => {
//     console.log('Dados recebidos no Stripe:', req.body);
//     const { checkinDate, checkoutDate, adults, children } = req.body;

//     if (!checkinDate || !checkoutDate || !adults || !children) {
//         return res.status(400).json({ error: 'Faltam dados obrigatórios' });
//     }

//     try {
//         // Reservation lógic
//         const checkin = new Date(checkinDate);
//         const checkout = new Date(checkoutDate);
//         const days = (checkout - checkin) / (1000 * 3600 * 24);

//         // Total price
//         const pricePerAdult = 10000; // R$ 100,00 (centavos)
//         const pricePerChild = 5000;  // R$ 50,00 (centavos)
//         const totalPrice = (adults * pricePerAdult + children * pricePerChild) * days;

//         // Cria uma sessão no Stripe
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'brl',
//                         product_data: {
//                             name: `Reserva para ${adults} adultos e ${children} crianças`,
//                         },
//                         unit_amount: totalPrice, // em centavos
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: `${process.env.BASE_URL}/success.html`,
//             cancel_url: `${process.env.BASE_URL}/cancel.html`,
//         });

//         // Salvar in cache
//         const cacheEntry = new Cache({
//             checkinDate,
//             checkoutDate,
//             adults,
//             children,
//             sessionId: session.id,
//         });
//         console.log('Salvando no cache:', cacheEntry);
//         await cacheEntry.save();

//         res.json({ id: session.id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// });


// // Verificar pagamento e salvar em reservations
// router.post('/verify-payment', async (req, res) => {
//     console.log('Session ID recebido para verificação:', sessionId);
//     console.log('Session recuperada do Stripe:', session);  
//     const { sessionId } = req.body;

//     try {
//         const session = await stripe.checkout.sessions.retrieve(sessionId);
//         if (session.payment_status === 'paid') {
//             const cacheEntry = await Cache.findOne({ sessionId });
//             if (!cacheEntry) {
//                 return res.status(404).json({ error: 'Dados da reserva não encontrados no cache.' });
//             }

//             // Salvar em reservations
//             const reservation = new Reservation({
//                 checkinDate: cacheEntry.checkinDate,
//                 checkoutDate: cacheEntry.checkoutDate,
//                 adults: cacheEntry.adults,
//                 children: cacheEntry.children,
//                 sessionId: sessionId,
//                 paymentStatus: 'paid',
//                 totalPrice: session.amount_total / 100, // Convertendo para reais
//             });
//             console.log('Salvando em reservas:', reservation);
//             await reservation.save();

//             // Remover do cache
//             await Cache.deleteOne({ sessionId });

//             res.json({ success: true });
//         } else {
//             res.status(400).json({ error: 'Pagamento não confirmado.' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;