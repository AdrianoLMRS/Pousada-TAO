// *DEPENDECIES
  require('dotenv').config(); // Carregar variáveis de ambiente
  const nodemailer = require("nodemailer");

// *CONSTANTS
  const EMAIL = 'test.adm2002@gmail.com'; // TEST EMAIL --- change later

/**
 * Sends a test email using Nodemailer.
 * 
 * This function creates a transporter using Gmail SMTP, configures the email
 * details, and sends a test email. It then logs the message ID of the sent email.
 * 
 * @async
 * @function main
 * @throws {Error} If there's an issue with sending the email.
 * @returns {Promise<void>} A promise that resolves when the email is sent successfully.
 */
async function main() {
  // *TRANSPORTER CONSTANT
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: process.env.TEST_EMAIL_PASS
    },
  });

  // Suvmits a test e-mail
  let info = await transporter.sendMail({
    from: EMAIL,
    to: "adriano.limarossi@gmail.com",
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello World!</h1>
    <p>Test succesfull!</p>
    `,
  });

  console.log(info.messageId); // ID gerado após envio bem-sucedido
}

main().catch(err => console.log(err));