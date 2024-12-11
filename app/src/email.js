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
  const nodemailer = require("nodemailer"); // For GMAIL

// *CONSTANTS
  global.EMAIL = 'test.adm2002@gmail.com'; // TEST EMAIL --- change later
  const PASS = process.env.TEST_EMAIL_PASS; // TEST PASS --- change later


/**
 * Creates and configures an email transporter using Gmail SMTP.
 * 
 * This function sets up a nodemailer transporter with Gmail SMTP settings,
 * using the predefined EMAIL constant and the TEST_EMAIL_PASS environment variable
 * for authentication.
 * 
 * @async
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

// Create & exports GMAIL transporter
const transporter = createTransporter();
module.exports = transporter;