// Calculate total price for the reservation
const calculateTotalPrice = (days, adults, children) => {
  const pricePerAdult = 15000; // R$ 150,00 (in BRL cents)
  const pricePerChild = 7500;  // R$ 75,00 (in BRL cents)
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