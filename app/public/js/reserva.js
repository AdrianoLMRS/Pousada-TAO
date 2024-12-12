// TODO : enables/disables .stripeBtn
// Steps logic
const stepMultiplier = 50;
let currentStep = 0;
document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');
    const indicators = document.querySelectorAll('.indicator');
    const steps = document.querySelectorAll('section[class^="step"]');
    const totalSteps = steps.length;

    const prevArrow = document.querySelector('#prev-arrow');
    const nextArrow = document.querySelector('#next-arrow');

    // Updates slider with x-transform onclick of a button
    function updateStep(step) {
        currentStep = step;
        main.style.transform = `translateX(-${step * stepMultiplier}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === step);
            indicator.classList.toggle('visited', index <= step);
        });

        prevArrow.disabled = currentStep === 0;
        nextArrow.disabled = currentStep === totalSteps - 1;
    }

    // Validate steps input to see if can updateStep()
    function validateStep(stepIndex) {
        const stepForm = steps[stepIndex]?.querySelector('form');
        if (stepForm) {

            const paymentButtons = stepForm.querySelectorAll('.square'); // .square class buttons
            const isPaymentSelected = Array.from(paymentButtons).some(button => button.classList.contains('active'));

            // Validates form
            if (stepForm.id === 'payment-form' && !isPaymentSelected) {    return false;   }

            return stepForm.checkValidity();
        }
        return true;
    }

    // Onclick buttons to change steps
    window.step = function (targetStep = null) {
        if (targetStep === null) return;
    
        if (targetStep > currentStep) {
            if (!validateStep(currentStep)) return;
            

            // transferDataToStep2();
            
        }
    
        updateStep(targetStep);
    };
});

// Get parameters from url and fill </form>
document.addEventListener("DOMContentLoaded", () => {
    // URL params
    const params = new URLSearchParams(window.location.search);

    const autofillForm = () => {       
        // Get inputs
        const adultsInput = document.getElementById("adults");
        const childrenInput = document.getElementById("children");
        const babiesInput = document.getElementById("babies");
        const checkinInput = document.getElementById("checkIn");
        const checkoutInput = document.getElementById("checkOut");

        // Inputs minimum values
        const adultsMin = parseInt(adultsInput.getAttribute("min"), 10);
        const childrenMin = parseInt(childrenInput.getAttribute("min"), 10);
        const babiesMin = parseInt(babiesInput.getAttribute("min"), 10);
        const checkinMin = checkinInput.getAttribute("min");
        const checkinMax = checkinInput.getAttribute("max");

        // inputs maximum values
        const adultsMax = parseInt(adultsInput.getAttribute("max"), 10);
        const childrenMax = parseInt(childrenInput.getAttribute("max"), 10);
        const babiesMax = parseInt(babiesInput.getAttribute("max"), 10);
        const checkoutMin = checkoutInput.getAttribute("min");
        const checkoutMax = checkoutInput.getAttribute("max");

        // Inputs minimum & maximum calculations + params
        const adults = Math.min(adultsMax, Math.max(adultsMin, parseInt(params.get("adults") || "1", 10)));
        const children = Math.min(childrenMax, Math.max(childrenMin, parseInt(params.get("children") || "0", 10)));
        const babies = Math.min(babiesMax, Math.max(babiesMin, parseInt(params.get("babies") || "0", 10)));

        // checkIn & checkOut params
        let checkInValue = params.get("checkIn") || "";
        let checkOutValue = params.get("checkOut") || "";

        // checkIn & checkOut validation min and max values
        if (checkinMin && new Date(checkInValue) < new Date(checkinMin)) {
            checkInValue = checkinMin; // Set to min if it's before the allowed range
        }
        if (checkinMax && new Date(checkInValue) > new Date(checkinMax)) {
            checkInValue = checkinMax; // Set to max if it's after the allowed range
        }
        if (checkoutMin && new Date(checkOutValue) < new Date(checkoutMin)) {
            checkOutValue = checkoutMin; // Set to min if it's before the allowed range
        }
        if (checkoutMax && new Date(checkOutValue) > new Date(checkoutMax)) {
            checkOutValue = checkoutMax; // Set to max if it's after the allowed range
        }
        // Ensure checkOut is at least one day after checkIn
        const checkInDate = new Date(checkInValue);
        const checkOutDate = new Date(checkOutValue);

        if (checkOutDate <= checkInDate) {
            checkInDate.setDate(checkInDate.getDate() + 1); // Add one day to checkIn
            checkOutValue = checkInDate.toISOString().split("T")[0];
        }

        // Insert inputs values
        adultsInput.value = adults;
        childrenInput.value = children;
        babiesInput.value = babies;
        checkinInput.value = checkInValue;
        checkoutInput.value = checkOutValue;

        /**
         * Checks if the input values in the booking form match the default values.
         * If all inputs match the default, it triggers the step function to go to the payment form.
         * This function is specifically designed for the home page booking form.
         *
         * @returns {void}
         */
        const checkDefaults = () => {
            // Default values of #booking-from in home page
            const defaultValues = {
                adults: [1, null],
                children: [0, null],
                babies: [0, null],
                checkIn: ["", null],
                checkOut: ["", null],
            };

            // Helper function to check if a value matches the default
            const matchesDefault = (value, defaultOptions) => {
                if (defaultOptions.includes(null)) return defaultOptions.includes(value);
                if (defaultOptions.includes(Date)) {
                    return value === "" || isNaN(new Date(value).getTime());
                }
                return defaultOptions.includes(value);
            };

            // Check each input against its default
            const isDefault =
                matchesDefault(adults, defaultValues.adults) ||
                matchesDefault(children, defaultValues.children) ||
                matchesDefault(babies, defaultValues.babies) ||
                matchesDefault(checkInValue, defaultValues.checkIn) ||
                matchesDefault(checkOutValue, defaultValues.checkOut);

            // If all inputs match the default, go to step 1 (payment form)
            // (Only trigger when user completed booking-form in home page)
            if (isDefault) {
                console.log("Default value detected.");
                step(1); // Go to payment-form
            }
            
        };

        checkDefaults();
            
    };

    autofillForm(); // Fills .booking-form inputs
    checkRequiredFields(); // Verify the values are valid, if is : enable button

    if (!document.getElementById('submitButton').disabled) { document.getElementById('submitButton').click() }

});



