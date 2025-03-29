let port;
let reader;

async function connect() {
    // Request a port and open a connection
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    // Start reading from the port
    reader = port.readable.getReader();
    readLoop();
}

async function readLoop() {
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            break; // Exit the loop if the stream is closed
        }
        if (value) {
            // Check if the value indicates a card scan
            if (value[0] === 1) {
                // Redirect to page2.html
                window.location.href = 'page2.html';
            }
        }
    }
}

// Connect to the Arduino when the page loads
window.onload = connect;