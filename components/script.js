document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-line');
    const terminalOutput = document.getElementById('terminal-output');

    if (commandInput) {
        commandInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const command = e.target.value.toLowerCase().trim();
                
                // Naya line add karein terminal mein
                const line = document.createElement('p');
                line.innerHTML = `<span style="color: #0f0;">> ${command}</span>`;
                terminalOutput.appendChild(line);

                processCommand(command);
                e.target.value = ''; 
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    function processCommand(cmd) {
        let response = "";

        if (cmd === 'help') {
            response = "Commands: status, 786, clear";
        } else if (cmd === 'status') {
            response = "SYSTEM: ONLINE | ENCRYPTION: ACTIVE";
        } else if (cmd === '786') {
            response = "Redirecting to Digital 786...";
            setTimeout(() => {
                window.location.href = 'modules/digital786/index.html';
            }, 1000);
        } else if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        } else {
            response = "Error: Unknown Command";
        }

        const respLine = document.createElement('p');
        respLine.innerHTML = response;
        terminalOutput.appendChild(respLine);
    }
});

