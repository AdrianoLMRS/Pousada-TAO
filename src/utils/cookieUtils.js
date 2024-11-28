// Set the JWT token in the HTTP-only cookie
const setJWTCookie = (res, token) => {

    if (typeof token !== 'string') {
    console.error('O token não é uma string:', token);
    throw new Error('O token JWT deve ser uma string.');
    }

    // Create cookie
    const cookieOptions = {
    httpOnly: true, // No Frontend via JS
    secure: process.env.NODE_ENV === 'production', // Apenas cookies HTTPS em produção
    secure: false, // testing
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour duration
    };

    // Configura o cookie com o nome "token" e o JWT gerado
    res.cookie('token', token, cookieOptions);

    console.log('\ncookieUtils :\n')
    console.log(`Token : ${token}\ncookieOptions ${cookieOptions}`)
    console.log('Cookie JWT set successfully!\n');

};

module.exports = { setJWTCookie };