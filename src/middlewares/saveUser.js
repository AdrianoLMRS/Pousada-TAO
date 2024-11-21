const User = require('../db/models/user');

async function saveUser(req, res, next) {
  if (req.oidc && req.oidc.user) {
    const { sub: auth0Id, name, email, picture } = req.oidc.user;

    try {
      // Verifica se o usuário já existe no banco
      const existingUser = await User.findOneAndUpdate(
        { auth0Id }, // Condição para encontrar o usuário
        {
          name,
          email,
          picture,
          lastLogin: Date.now(),
        }, // Dados para atualizar
        { new: true, upsert: true } // Cria se não existir (upsert)
      );

      console.log(`Usuário salvo/atualizado no MongoDB: ${existingUser._id}`);
    } catch (error) {
      console.error('Erro ao salvar o usuário no MongoDB:', error);
    }
  }

  next(); // Continua para a próxima etapa
}

module.exports = saveUser;
