// *CREATES A .LOG FILE THAT CONTAINS ALL THE LOGS

// *Dependecies
    const fs = require('fs');
    const path = require('path');

const originalLog = console.log; // Save the original console.log function

const logFilePath = path.join(__dirname, '../../logs.log'); // Path for .log file

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); // append logs

// Function to format the date in a better way
function formatDate() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').split('.')[0]; 
}

// Override the default console.log behavior
console.log = function (...args) {

    // Create a formatted log message
    const timestamp = formatDate();
    const formattedMessage = `[${timestamp}] ${args.join(' ')}`;

    logStream.write(`${formattedMessage}\n`); // Write the log message to the file

    originalLog.apply(console, args); // Output the log to the terminal as well
};