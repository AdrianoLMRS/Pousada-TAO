// *Validates the user input + redirects user to /reserva with parameters
function checkRequiredFields(buttons, requiredFields) {
    let allFilled = true;

    // Check if all required fields are filled
    requiredFields.forEach(field => {
        if (!field.value) {
            allFilled = false;
        }
    });

    // Enable or disable each button based on whether all required fields are filled
    buttons.forEach(button => {
        button.disabled = !allFilled;
    });
}
// Add event listener for window.onload to ensure initial validation
window.onload = () => {
    // For a single button, wrap it in an array-like object
    checkRequiredFields(
        [document.getElementById('submitButton')],  // Single button wrapped in an array
        document.querySelectorAll('#booking-form input[required]')
    );
};

// Add event listeners to check fields whenever their value changes
document.querySelectorAll('#booking-form input[required]').forEach(input => {
    input.addEventListener('input', () => {
        checkRequiredFields(
            Array.from(document.querySelectorAll('#submitButton')), // Buttons by class
            document.querySelectorAll('#booking-form input[required]')
        );
    });
    input.addEventListener('change', () => {
        checkRequiredFields(
            Array.from(document.querySelectorAll('#submitButton')), // Buttons by class
            document.querySelectorAll('#booking-form input[required]')
        );
    });
    input.addEventListener('focus', () => {
        checkRequiredFields(
            Array.from(document.querySelectorAll('#submitButton')), // Buttons by class
            document.querySelectorAll('#booking-form input[required]')
        );
    });
    input.addEventListener('blur', () => {
        checkRequiredFields(
            Array.from(document.querySelectorAll('#submitButton')), // Buttons by class
            document.querySelectorAll('#booking-form input[required]')
        );
    });
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


/**
 * Updates the minimum check-out date based on the selected check-in date.
 * This function ensures that the check-out date is always at least one day after the check-in date.
 * It also adjusts the check-out date if it's before or equal to the new minimum date.
 * 
 * @function
 * @name updateCheckOutMin
 * @description Updates the minimum check-out date and adjusts the check-out date if necessary.
 * @returns {void} This function returns nothing.
 */
function updateCheckOutMin() {
    const checkInDate = new Date(document.getElementById('checkIn').value); // CheckIn date
    const checkOutInput = document.getElementById('checkOut');

    if (!checkInDate) return; // CheckIn date validation

    // Min value for checkOut date is one day after checkIn date
    checkInDate.setDate(checkInDate.getDate() + 1);
    const minCheckOutDate = checkInDate.toISOString().split('T')[0]; // YYYY-MM-DD (ISO format)
    checkOutInput.setAttribute('min', minCheckOutDate);

    // If checkOut date is before checkIn date
    if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
        checkOutInput.value = minCheckOutDate; // checkOut value
    }

        const checkIn = document.getElementById('checkIn');
        const checkOut = document.getElementById('checkOut');

        if (checkIn.value) {
            const checkInDate = new Date(checkIn.value);
            checkInDate.setDate(checkInDate.getDate() + 1); // Add one more day

            // Formats date to ISO format : YYYY-MM-DD
            const year = checkInDate.getFullYear();
            const month = (checkInDate.getMonth() + 1).toString().padStart(2, '0');
            const day = (checkInDate.getDate() + 1).toString().padStart(2, '0');
            const nextDay = `${year}-${month}-${day}`;

            checkOut.setAttribute('min', nextDay); // CheckOut minimum date is one day tomorrow checkIn date
            checkOut.value = nextDay; // Checkout to tommorow
        }
        formatDate(checkOut); // Formats date to brazilian format DD-MM-YYYY 
}


// Function executed onload to format the booking-form dates to brazilian format DD-MM-YYYY
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

// * BOOKING-FORM LIVEVALUES

// Price per person in BRL (R$)
const adultPrice = 150; // BRL
const childPrice = 75; // BRL

// Function to update the values in #adults & #children HTML elements
function updateLiveValues(inputElement) {
    const inputId = inputElement.id; // ID of the input that was changed
  
    // Identifies the corresponding live value element
    let liveValueElement;
    let pricePerPerson;
  
    if (inputId === "adults") {
        // Adults element
      liveValueElement = document.getElementById("adultsLive");
      pricePerPerson = adultPrice;
    } else if (inputId === "children") {
        // Children element
      liveValueElement = document.getElementById("childrenLive");
      pricePerPerson = childPrice;
    }
  
    if (liveValueElement && pricePerPerson) {
      const quantity = parseInt(inputElement.value) || 0;
  
      // If the quantity is greater than 0, calculate the total; otherwise, leave it empty
      if (quantity > 0) {
        const total = quantity * pricePerPerson;
        liveValueElement.innerHTML = `${total},00<small>/noite</small>`;
        liveValueElement.style.opacity = '1'
      } else {
        liveValueElement.style.opacity = '0'
        // setTimeout() here because of opacity css animation
        setTimeout(() => {
            liveValueElement.textContent = ""; // Clears the text if the quantity is 0 or invalid
            updateTotalLiveValues(); // Need to handle timeout correctly
        }, '500')
      }

    }
}  

// Returns the difference between checkIn & checkOut in days
// Used in updateTotalLiveValues()
function calculateDaysBetweenDates() {
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");

  const checkInDate = new Date(convertToISO(checkInInput.value)); // Converts dates to ISO format
  const checkOutDate = new Date(convertToISO(checkOutInput.value)); // Converts dates to ISO format

  // Validation
  if (!isNaN(checkInDate) && !isNaN(checkOutDate) && checkOutDate > checkInDate) {
    // Difference in miliseconds
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    // Convert to days
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days;
  }

  return 0; // If no dates
}

// Updates #totalValueElement based on .liveValues HTML elements
function updateTotalLiveValues() {
    const liveValueElements = document.querySelectorAll(".liveValue");
    const totalValueElement = document.getElementById("totalValue");
    const nightLiveValueElement = document.getElementById("nightLiveValue");
  
    const days = calculateDaysBetweenDates(); // returns the days difference between checkIn & checkOut
    let total = 0;

    // Updates the nights the user is gona take
    if (days) {
        nightLiveValueElement.style.display = "inline-block";
        nightLiveValueElement.innerHTML = `Noites: <span>${days}</span>`;
    }
    else {
        nightLiveValueElement.innerHTML = "";
        nightLiveValueElement.style.display = "none";
    };
  
    liveValueElements.forEach((element) => {
      const valueText = element.textContent.replace("R$", "").replace(",", ".").trim();
      const value = parseFloat(valueText) || 0;
      total += value;
    });
  
    total *= days; // Multioplies per day difference (good to reserva logic)
  
    // total value in #totalValueElement
    totalValueElement.innerHTML = total > 0 ? `Total: <strong>R$${total.toFixed(2)}</strong>` : "";
}

// Initial functions calls
// TODO : Verify why only works after 1001 miliseconds
document.addEventListener("DOMContentLoaded", () => {
    const adultsInput = document.getElementById("adults");
    const childrenInput = document.getElementById("children");

    updateLiveValues(adultsInput);
    updateLiveValues(childrenInput);

    /* 
        * updateTotalLiveValues(); Does not work for some reason...
        * Need to simulate user click the buttom in #adults...
    */
    setTimeout(() => {
        document.querySelector('.quantity #adults + button').click();
        document.querySelector('.quantity-down').click();
    }, '1001');
});