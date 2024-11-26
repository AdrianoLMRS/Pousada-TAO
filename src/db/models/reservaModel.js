const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definindo o schema para a reserva
const reservaSchema = new Schema({
  cliente: {
    id: String,
    email: String
  },
  pagamento: {
    id: String,
    status: String,
    amount: Number,
    currency: String,
    description: String,
    payment_method: String,
    payment_method_details: {
      type: String, // Cartão, boleto, etc.
      card: {
        brand: String,
        last4: String,
        exp_month: Number,
        exp_year: Number
      }
    },
    charges: [{
      charge_id: String,
      amount: Number,
      currency: String,
      status: String,
      receipt_url: String
    }],
    metadata: {
      order_id: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reserva = model('Reserva', reservaSchema);