// * DEPENDECIES
    const { twilioClient } = require('../messages');
    const { accountPhoneTwilio } = require('../messages');

/**
 * Sends an sms containing a secure hash to the specified user sms.
 *
 * @param {string} hash - The unique identifier for the customer, used to generate the hash.
 * @param {string} userNumber - The number of the user to who the sms will be sent.
 * @param {string} userName - The name of the user to who the sms will be sent (Optional: default 'cliente').
 * @log - console.log the message ID
 * @returns {Promise<Object>} - A promise that resolves in void.
 * @throws {Error} - Throws an error if the sms sending process fails.
 */
async function sendSMS(hash, userNumber, userName = 'cliente' ) {
    try {
      const message = await twilioClient.messages.create({
        body: `Olá ${userName}!\nCaso sua sessão de login acabe, seu código de acesso é:\n
        ${hash}`, // Message body
        from: accountPhoneTwilio, // Twilio phone number
        to: userNumber, // Destination phone number
      });
      console.log('SMS sent with success! ID:\n', message.sid); // Message ID
    } catch (error) {
      console.error('Error trying to send SMS: ', error);
    }
  }

module.exports = sendSMS;