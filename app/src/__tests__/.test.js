// *DEPENDECIES
    // EMAIL :
    const { sendTestEmail } = require('./messages/sendEmail.test');  // Importa a função de teste


//* -------    TESTS    --------- *//

// * Email tests
/**
 * Tests the functionality of sending a test email.
 * Test with npm test (using jest)
 * @returns {Promise<void>} A promise that resolves if the email is sent successfully, otherwise it throws an error.
 */
describe('Email tests Tests', () => {
  test('Should send a test email successfully', async () => {
    await expect(sendTestEmail()).resolves.not.toThrow();
  });
});
