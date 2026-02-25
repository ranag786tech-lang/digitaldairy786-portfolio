document.addEventListener('DOMContentLoaded', () => {
    const cmdInput = document.getElementById('command-line');
    
    cmdInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const cmd = this.value.toLowerCase().trim();
            executeCommand(cmd);
            this.value = '';
        }
    });

    function executeCommand(command) {
        if (command === 'help') {
            alert("Available Commands: \n- 'github': Open Repo \n- 'clear': Reset Terminal \n- 'projects': List all projects");
        } else if (command === 'github') {
            window.open('https://github.com', '_blank');
        } else if (command === 'projects') {
            alert("1. Digital 786 \n2. Alpha-Omega Quantum");
        } else if (command === 'clear') {
            alert("System Rebooting...");
        } else {
            console.log("Unknown command: " + command);
        }
    }

    console.log("DG Universe: Nexus Core Initialized.");
});
