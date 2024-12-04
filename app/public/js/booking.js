// *Validates the user input + redirects user to /reserva with parameters
// TODO : Validates user input more complex
function submitForm() {
    // Get the values from the form fields
    const checkIn = document.getElementById("check-in").value;
    const checkOut = document.getElementById("check-out").value;
    const adultos = document.getElementById("adultos").value;
    const children = document.getElementById("children-select").value;
    const babies = document.getElementById("baby-select").value;

    // Validate the form fields
    if (!checkIn || !checkOut) {
        alert("Please enter both check-in and check-out dates.");
        return;
    }

    if (adultos === "custom") {
        alert("Please select the number of adults.");
        return;
    }

    // Build the URL with the form data as parameters
    const url = `/reserva?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&adultos=${encodeURIComponent(adultos)}&children=${encodeURIComponent(children)}&babies=${encodeURIComponent(babies)}`;

    // Redirect the user to the reservation page with the form data in the URL
    window.location.href = url;
}

