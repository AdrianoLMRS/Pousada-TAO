const { spawn, execSync } = require("child_process");
const path = require("path");

// Using __dirname to ensure the absolute path
const scriptPath = path.join(__dirname, 'install.sh');
console.log(`Path: ${scriptPath}`);

const isWindows = process.platform === "win32";

// Define the command based on the operating system
const command = isWindows ? "bash" : "sh";

/**
 * Main function that executes the installation script.
 * It sets executable permissions (if necessary) and runs the script.
 *
 * @returns {void}
 */
function main() {
    try {
        let finalScriptPath = scriptPath; // Absolute path using __dirname

        // If running in WSL, adjust the path
        if (isWindows) {
            finalScriptPath = finalScriptPath.replace(/\\/g, "/"); // Convert backslashes to normal slashes
            finalScriptPath = finalScriptPath.replace(/^([A-Z]):/, '/mnt/$1').toLowerCase(); // Convert to WSL format
        }

        // Run chmod only on Linux/Mac
        if (!isWindows) {
            console.log("Setting executable permissions for install.sh...");
            execSync(`chmod +x "${finalScriptPath}"`, { stdio: "inherit" });
        }

        // Run the script
        const child = spawn(command, [finalScriptPath], { stdio: "inherit", shell: true });

        child.on("exit", (code) => {
            if (code === 0) {
                console.log("install.sh executed successfully ✅");
            } else {
                console.error(`install.sh failed with exit code ${code} ❌`);
                process.exit(code);
            }
        });

        child.on("error", (err) => {
            console.error("Failed to start install.sh:", err);
            process.exit(1);
        });
    } catch (err) {
        console.error("Error setting permissions or executing the script:", err);
        process.exit(1);
    }
}

main();