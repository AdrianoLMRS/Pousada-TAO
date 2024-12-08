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


document.addEventListener('DOMContentLoaded', () => {
    // Função para formatar a data no formato yyyy-mm-dd
    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    // Função para ajustar o checkout caso seja no mesmo dia do check-in
    function adjustCheckOut() {
        const checkInDate = new Date(document.getElementById("check-in").value);
        const checkOutDate = new Date(document.getElementById("check-out").value);
    
        // Se o check-out for igual ou anterior ao check-in, ajusta o check-out para o dia seguinte
        if (checkOutDate <= checkInDate) {
            checkOutDate.setDate(checkInDate.getDate() + 1);
            document.getElementById("check-out").value = formatDate(checkOutDate);
        }
    }
    
    // Definindo a data de hoje e amanhã para a validação mínima
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const todayFormatted = formatDate(today);
    const tomorrowFormatted = formatDate(tomorrow);
    
    // Definindo as datas mínimas para os inputs
    document.getElementById("check-in").setAttribute("min", todayFormatted);
    document.getElementById("check-out").setAttribute("min", tomorrowFormatted);
    
    // Adicionando evento para garantir que o checkout seja sempre após o check-in
    document.getElementById("check-in").addEventListener("change", adjustCheckOut);
    document.getElementById("check-out").addEventListener("change", adjustCheckOut);
})

// * .quantity

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
    // Datye in ISO format (yyyy-mm-dd)
    if (value) {
        let date = new Date(value);
        let day = String(date.getDate() + 1).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        // dd/mm/yyyy format (Brazil 🇧🇷)
        input.value = `${day}-${month}-${year}`;
    }
}