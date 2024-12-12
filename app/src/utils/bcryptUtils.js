// *Dependencies
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Loads .env
    const bcrypt = require('bcryptjs');

// Function to hash a password using bcrypt
async function encrypt(pass, secret = process.env.SECRET_HASH, saltRounds = 10) {

    // Saltrouds : complexity to hash, more the better but slower
    // Default = 10

    try {
        const salt = await bcrypt.genSalt(saltRounds);

        const combinedPass = pass + secret

        // Hash the password with the salt
        const hashedPass= await bcrypt.hash(combinedPass, salt);

        console.log('Encrypted password:', hashedPass);
        return hashedPass;
    } catch (error) {
        console.error('Error encrypting password:', error);
    }
}

// Function to compare a password with a hashed password and secret
async function compare(plainPass, secret = process.env.SECRET_HASH, hash) {
    try {
        // Combine the plain password with the secret
        const combinedPassword = plainPass + secret;

        // Compare the combined password with the stored hashed password
        const isMatch = await bcrypt.compare(combinedPassword, hash);

        if (isMatch) {
            console.log('Password is correct');
            return true;
        } else {
            console.log('Password is incorrect');
            return false;
        }
    } catch (error) {
        console.error('Error comparing passwords with secret:', error);
    }
}

module.exports = {
    encrypt,
    compare,
}
