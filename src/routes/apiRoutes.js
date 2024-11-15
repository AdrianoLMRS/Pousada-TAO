const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API funcionando');
});

// Exemplo de rota de dados
router.get('/data', (req, res) => {
  res.json({ message: 'Dados da API' });
});

module.exports = router;
