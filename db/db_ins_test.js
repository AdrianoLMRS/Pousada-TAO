const express = require('express');
const router = express.Router();
const Room = require('./models/Room');

// Rota para adicionar um quarto
router.post('/rooms', async (req, res) => {
  const { name, description, price } = req.body;

  const newRoom = new Room({ name, description, price });

  try {
    await newRoom.save();
    res.status(201).send('Quarto adicionado com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao adicionar quarto: ' + err);
  }
});

module.exports = router;