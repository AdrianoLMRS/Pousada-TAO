// * Dependecies
    const path = require('path'); // Path for folders
    require('dotenv').config({ path: path.join(__dirname, '../../.env') }); // Loads .env
    const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID; // TWILIO SID
const authToken = process.env.TWILIO_AUTH; // TWILIO AUTH
const accountPhoneTwilio = process.env.TWILIO_NUMBER; // TWILIO Phone number
const myPhone = process.env.MY_PHONE_NUMBER; // My personal phone number (for testing)

// Creates Twilio client with SID & authToken
const client = new twilio(accountSid, authToken);

// Send test SMS
client.messages
  .create({
    body: 'Test Message\nTwilio Client is running correctly!', // Message body
    from: accountPhoneTwilio, // Messeger number
    to: myPhone, // Destiny phone
  })
  .then((message) => console.log('SMS send with success! ID:\n', message.sid))
  .catch((error) => console.error('Error trying to send SMS: ', error));