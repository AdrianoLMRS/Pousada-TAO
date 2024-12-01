const User = require('../db/models/User'); // Altere o caminho para o modelo User conforme necessário

const getProfile = async (req, res) => {
    try {
        const { customerId } = req;

        // Busca os dados do usuário no banco de dados com base no customerId
        const user = await User.findOne({ customerId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Envia os dados do usuário como resposta
        return res.status(200).json({
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProfile };
