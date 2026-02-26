const commandInput = document.getElementById('command-line');
const terminalOutput = document.getElementById('terminal-output');

commandInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const command = e.target.value.toLowerCase().trim();
        processCommand(command);
        e.target.value = ''; // Input clear kar dein
    }
});

function processCommand(cmd) {
    let response = "";

    if (cmd === 'help') {
        response = "Available Commands: <br> - <b>status</b>: Check system health <br> - <b>786</b>: Access Digital archives <br> - <b>clear</b>: Clean terminal";
    } else if (cmd === 'status') {
        response = "<span style='color: #0f0;'>SYSTEM: ONLINE</span><br>LATENCY: 12ms<br>ENCRYPTION: AES-256 ACTIVE";
    } else if (cmd === '786') {
        response = "<span style='color: #d4af37;'>Redirecting to Digital 786 Hub...</span>";
        setTimeout(() => {
            window.location.href = 'modules/digital786/index.html';
        }, 1500);
    } else if (cmd === 'clear') {
        terminalOutput.innerHTML = '';
        return;
    } else {
        response = `<span style='color: red;'>Command not found: ${cmd}</span>`;
    }

    const newLine = document.createElement('p');
    newLine.innerHTML = `> ${cmd}<br>${response}`;
    terminalOutput.appendChild(newLine);
    
    // Auto-scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

