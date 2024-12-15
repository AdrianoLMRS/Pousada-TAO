/*
 * Create & exports email transporter constant
 * 
 * This file creates a transporter using Gmail SMTP, configures the email details
 * 
 */

// *DEPENDECIES
  // ! Does not work without path
  const path = require('path'); // Path for .env
  require('dotenv').config({ path: path.join(__dirname, './.env') }); // Loads .env
  const nodemailer = require("nodemailer"); // For GMAIL messages
  const twilio = require('twilio'); // for SMS messages

// *CONSTANTS
  // GMAIL settings
  global.EMAIL = 'test.adm2002@gmail.com'; // TEST EMAIL --- change later
  const PASS = process.env.TEST_EMAIL_PASS; // TEST PASS --- change later
  // TWILIO settings
  const accountSid = process.env.TWILIO_SID; // TWILIO SID
  const authToken = process.env.TWILIO_AUTH; // TWILIO AUTH
  const accountPhoneTwilio = process.env.TWILIO_NUMBER; // TWILIO Phone number
  global.MY_PHONE = process.env.MY_PHONE_NUMBER; // My personal phone number (for testing)


/**
 * Creates and configures an email transporter using Gmail SMTP.
 * 
 * This function sets up a nodemailer transporter with Gmail SMTP settings,
 * using the predefined EMAIL constant and the TEST_EMAIL_PASS environment variable
 * for authentication.
 * 
 * @function createTransporter
 * @throws {Error} If there's an issue creating the transporter
 * @returns {Promise<nodemailer.Transporter>} A configured nodemailer transporter object
 */
function createTransporter() {
  try {
    // Create transporter using Gmail SMTP & authenticate
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: global.EMAIL,
        pass: PASS,
      },
    });

    return transporter; // returns created transport
  } catch (err) {
    console.log('Error creating GMAIL transporter:', err);
    throw err; 
  }
}


/**
 * Creates a Twilio client with the provided SID and authToken.
 * 
 * @param {String} ssid
 * @param {String} authToken
 * @return {TwilioClient}
 * @name TwilioClient
 */
function createTwilioClient(sid, auth) {
  return new twilio(sid, auth);
}

// Create & exports GMAIL transporter
const transporter = createTransporter();
// Creates Twilio client with SID & authToken
const twilioClient = createTwilioClient(accountSid, authToken);
module.exports = { 
  transporter,
  accountPhoneTwilio,
  twilioClient,
};