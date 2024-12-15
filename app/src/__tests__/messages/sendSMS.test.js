// * DEPENDECIES
    const { twilioClient } = require('../../messages');
    const { accountPhoneTwilio } = require('../../messages');
    const myPhone = global.MY_PHONE;


/**
 * This function sends a test SMS message using Twilio client.
 *
 * @function sendTestSMS
 * @returns {Promise<void>} - A promise that resolves when the SMS is sent successfully or rejects with an error.
 * @log - console.log the message ID
 * @example
 * await sendTestSMS();
 * @throws Will throw an error if there's a problem sending the SMS.
 */
async function sendTestSMS() {
    try {
      const message = await twilioClient.messages.create({
        body: 'Test Message\nHello world!\nTwilio Client is running correctly!', // Message body
        from: accountPhoneTwilio, // Twilio phone number
        to: myPhone, // Destination phone number
      });
      console.log('SMS sent with success! ID:\n', message.sid); // Message ID
    } catch (error) {
      console.error('Error trying to send SMS: ', error);
    }
  }

module.exports = { sendTestSMS }; // Exports test function to .test.js