// *Dependecies
  const path = require('path');
  require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
  const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  // Verifica o token nos cookies ou no cabeçalho Authorization
  const token =
    req.cookies?.token || // Prioriza o token nos cookies
    req.header('Authorization')?.replace('Bearer ', ''); // Ou busca no cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Anexa as informações do usuário à requisição
    next(); // Continua para o próximo middleware
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};