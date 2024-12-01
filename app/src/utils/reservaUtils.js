// Calculate total price for the reservation
const calculateTotalPrice = (days, adults, children) => {
  const pricePerAdult = 10000; // R$ 100,00 (in cents)
  const pricePerChild = 5000;  // R$ 50,00 (in cents)
  return (adults * pricePerAdult + children * pricePerChild) * days;
};

// Validate reservation dates and return the number of days
const validateDates = (checkinDate, checkoutDate) => {
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);

  if (isNaN(checkin) || isNaN(checkout) || checkout <= checkin) {
      throw new Error('Invalid check-in and check-out dates.');
  }

  const days = (checkout - checkin) / (1000 * 3600 * 24);
  return { checkin, checkout, days };
};

module.exports = {
  calculateTotalPrice,
  validateDates,
}