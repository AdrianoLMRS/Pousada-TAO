const User = require('../db/models/user'); // User model

async function saveUser(req, res, next) {
  if (req.oidc && req.oidc.user) {
    const { sub: auth0Id, name, email, picture } = req.oidc.user;

    try {
      // if !user create one, if user then update
      const existingUser = await User.findOneAndUpdate(
        { auth0Id }, // Condition for find user
        {
          name,
          email,
          picture,
          lastLogin: Date.now(),
        }, // User data
        { new: true, upsert: true } // Create if dont exist (upsert)
      );

      console.log(`Usuário salvo/atualizado no MongoDB: ${existingUser._id}`);
    } catch (error) {
      console.error('Erro ao salvar o usuário no MongoDB:', error);
      return res.status(500).send('Erro ao salvar o usuário no banco de dados');
    }
  }
  next();
}

module.exports = saveUser;