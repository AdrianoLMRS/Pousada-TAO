// * DEPENDECIES
    const { transporter } = require('../../messages');  // Imports nodemailer GMAIL transporter in email.js file

/**
 * Sends a test email using Nodemailer.
 * 
 * @async
 * @function sendTestEmail
 * @throws {Error} If there's an issue with sending the email.
 * @returns {Promise<void>} A promise that resolves when the email is sent successfully.
 */
async function sendTestEmail() {
  // Sending the test Gmail 
  let info = await transporter.sendMail({
    from: global.EMAIL,
    to: "adriano.limarossi@gmail.com",
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello World!</h1>
    <p>&emsp;&emsp;Test succesfull!</p>
    `,
  });

  console.log(info.messageId); // Generated messageID after sending message
}

module.exports = { sendTestEmail }; // Exports test function to .test.js