// *Dependecies
    const transporter = require('../email');

const EMAIL = global.EMAIL; // Email (maybe change later)

// Function to send email
/**
 * Sends an email containing a secure hash to the specified user email.
 *
 * @param {string} customerId - The unique identifier for the customer, used to generate the hash.
 * @param {string} userEmail - The email address of the user to whom the email will be sent.
 * @log - console.log the message ID
 * @returns {Promise<Object>} - A promise that resolves to the information about the sent email.
 * @throws {Error} - Throws an error if the email sending process fails.
 */
async function sendEmail(hash, userEmail) {
    try {

        const emailMessage = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #333;">Bem-vindo!</h2>
            <p>Geramos um hash seguro para sua conta. Por favor, mantenha esta informação em segurança:</p>
            <pre style="background: #f4f4f4; padding: 10px; border-radius: 5px; overflow: auto; text-align: start; display inline-flex;
            flex-direction: row; justify-content: center; max-width: 50vw">
                ${hash}
            </pre>
            <small>Pedimos para que não compartilhe este código com ninguém.</small>
            <p>Se você tiver alguma dúvida, fique à vontade para entrar em contato conosco.</p>
            <p>Atenciosamente,</p><br>
            <h3>POUSADA TAO</h3>
        </div>
        `;        

        // Define the email options
        const mailOptions = {
            from: EMAIL,
            to: String(userEmail),                 
            subject: 'Seu Login',   // Subject line
            // HTML with hashed password
            html: emailMessage
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendEmail;