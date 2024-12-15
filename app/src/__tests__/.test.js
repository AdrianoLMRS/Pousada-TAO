// *DEPENDECIES
    // EMAIL :
    const { sendTestEmail } = require('./messages/sendEmail.test');  // Importa a função de teste
    // SMS :
    const { sendTestSMS } = require('./messages/sendSMS.test');  // Importa a função de teste


//* -------    TESTS    --------- *//

// * Email tests
/**
 * Tests the functionality of sending a test email.
 * Test with npm test (using jest)
 * @returns {Promise<void>} A promise that resolves if the email is sent successfully, otherwise it throws an error.
 */
describe('Email Tests', () => {
  test('Should send a test email successfully', async () => {
    await expect(sendTestEmail()).resolves.not.toThrow();
  });
});

// * SMS tests
/**
 * Tests the functionality of sending a test SMS.
 * Test with npm test (using jest)
 * @returns {Promise<void>} A promise that resolves if the email is sent successfully, otherwise it throws an error.
 */
describe('SMS Tests', () => {
  test('Should send a test SMS successfully', async () => {
    await expect(sendTestSMS()).resolves.not.toThrow();
  });
});
