const baseURL = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`${baseURL}/profile/data`, { credentials: 'include' }); // Include cookies
    if (response.ok) {
      const { user, reservas } = await response.json();

      // Display user information
      document.getElementById('profile-content').innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <h2>Your Reservations</h2>
        <ul id="reservations-list"></ul>
      `;

      // Display reservations
      const reservationsList = document.getElementById('reservations-list');
      if (reservas.length > 0) {
        reservas.forEach((reserva) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <p><strong>Check-in:</strong> ${new Date(reserva.checkinDate).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(reserva.checkoutDate).toLocaleDateString()}</p>
            <p><strong>Adults:</strong> ${reserva.adults}</p>
            <p><strong>Children:</strong> ${reserva.children}</p>
            <p><strong>Total Price:</strong> R$ ${(reserva.totalPrice / 100).toFixed(2)}</p>
            <hr>
          `;
          reservationsList.appendChild(li);
        });
      } else {
        reservationsList.innerHTML = '<p>No reservations found.</p>';
      }
    } else {
      const error = await response.json();
      window.location.href = '/login.html'; // Redirect to login if failed
    }
  } catch (err) {
    console.error('Error fetching profile data:', err);
    alert('Error loading profile');
    window.location.href = '/login.html'; // Redirect to login if failed
  }
});
