// *Validates the user input + redirects user to /reserva with parameters
function checkRequiredFields() {
    // Select all required input fields
    const requiredFields = document.querySelectorAll('input[required]');
    const submitButton = document.getElementById('submitButton');
    let allFilled = true;

    // Check if all required fields are filled
    requiredFields.forEach(field => {
        if (!field.value) {
            allFilled = false;
        }
    });

    // Enable or disable the submit button based on whether all required fields are filled
    submitButton.disabled = !allFilled;
}
window.onload = checkRequiredFields();

// Add event listeners to check fields whenever their value changes
document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('input', checkRequiredFields);
    input.addEventListener('change', checkRequiredFields);
    input.addEventListener('focus', checkRequiredFields);
    input.addEventListener('blur', checkRequiredFields);
});

// Function to handle form submission
function submitForm(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form data
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);

    // Create the query string from the form data
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
        params.append(key, value);
    });

    // Redirect to /reserva with the parameters
    window.location.href = '/reserva?' + params.toString();
}


document.addEventListener("DOMContentLoaded", () => {
    const checkInInput = document.getElementById("checkIn");
    const checkOutInput = document.getElementById("checkOut");

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const tomorrow = new Date(today); // tommorrow for checkOut
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    // Get the date one month from today
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const nextMonthStr = nextMonth.toISOString().split("T")[0];

    // Set min and max attributes for the check-in input
    checkInInput.setAttribute("min", todayStr);
    checkInInput.setAttribute("max", nextMonthStr);

    // Set min and max attributes for the check-out input
    checkOutInput.setAttribute("min", tomorrowStr);
    checkOutInput.setAttribute("max", nextMonthStr);

    // Set initial values for check-in and check-out
    checkInInput.value = todayStr;
    checkOutInput.value = tomorrowStr;

});


// * .quantity inputs logic

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.quantity').forEach(quantityContainer => {
        const input = quantityContainer.querySelector('input[type="number"]');
        const btnUp = quantityContainer.querySelector('.quantity-up');
        const btnDown = quantityContainer.querySelector('.quantity-down');
        
        const min = parseFloat(input.getAttribute('min')) || 0;
        const max = parseFloat(input.getAttribute('max')) || Infinity;
      
        btnUp.addEventListener('click', () => {
            let value = parseFloat(input.value) || min;
            if (value < max) {
                input.value = value + 1;
                input.dispatchEvent(new Event('change'));
            }
        });
      
        btnDown.addEventListener('click', () => {
            let value = parseFloat(input.value) || min;
            if (value > min) {
                input.value = value - 1;
                input.dispatchEvent(new Event('change'));
            }
        });

        input.addEventListener('blur', () => {
            let value = parseFloat(input.value) || min;
            input.value = Math.max(min, Math.min(value, max));
        });
    });
})

// Format Input Dates
function formatDate(input) {
    let value = input.value;
    // Date in ISO format (yyyy-mm-dd)
    if (value) {
        let date = new Date(value);
        // Check if the date is valid
        if (!isNaN(date.getTime())) {
            let day = String(date.getDate() + 1).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let year = date.getFullYear();
            // Format to dd/mm/yyyy (Brazil 🇧🇷)
            input.value = `${day}-${month}-${year}`;
        } else {
            console.error("Invalid date:", value); // Handle invalid date
        }
    }
}

async function formatDates() {
    // Wait 1 second before formatting the dates
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Format dates after 1 second delay
    formatDate(document.getElementById("checkIn")); // Format checkIn to Brazilian date (dd-mm-aaaa)
    formatDate(document.getElementById("checkOut")); // Format checkOut to Brazilian date (dd-mm-aaaa)
}

function validateInput() {
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
    const adults = parseInt(document.getElementById("adults").value);
    const children = parseInt(document.getElementById("children").value);
    const babies = parseInt(document.getElementById("babies").value);

    // Validate check-in and check-out dates
    if (checkIn === "" || checkOut === "" || checkIn >= checkOut) {
        return false;
    }

    // Validate number of adults, children, and babies
    if (isNaN(adults) || isNaN(children) || isNaN(babies) || adults <= 0 || children < 0 || babies < 0) {
        return false;
    }

    return true;
}

function updateCheckout() {
    const checkInInput = document.getElementById("checkIn");
    const checkOutInput = document.getElementById("checkOut");

    if (checkInInput.value) {
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkInDate.getDate() + 1); // Add 1 day to the check-in date
        checkOutInput.value = checkOutDate.toISOString().split("T")[0];
        formatDate(checkOutInput);
    };
}