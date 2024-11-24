const baseURL = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/profile/data', { credentials: 'include' }); // Include cookies
    if (response.ok) {
      const user = await response.json();
      document.getElementById('profile-content').innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      `;
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to load profile');
      window.location.href = '/login.html'; // Redireciona para login se falhar
    }
  } catch (err) {
    console.error('Error fetching profile data:', err);
    alert('Error loading profile');
  }
});