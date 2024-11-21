const User = require('../db/models/user');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }
    console.log(user)

    res.render('profile', { user });
  } catch (error) {
    console.error('Erro ao carregar o perfil:', error);
    res.status(500).send('Erro no servidor');
  }
};

