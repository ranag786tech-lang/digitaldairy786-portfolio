document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-line');
    const output = document.getElementById('terminal-output');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            executeCommand(cmd);
            input.value = '';
        }
    });

    function executeCommand(cmd) {
        let p = document.createElement('p');
        p.innerHTML = `<span style="color: #0f0;">user@DG-Universe:~$</span> ${cmd}`;
        output.appendChild(p);

        let response = document.createElement('p');
        
        if (cmd === 'help') {
            response.innerHTML = "SYSTEM COMMANDS:<br> - <b>status</b>: Check Quantum Core<br> - <b>786</b>: Enter Digital Hub<br> - <b>hack --all</b>: Start Matrix Stream<br> - <b>clear</b>: Purge Terminal";
        } 
        else if (cmd === 'status') {
            response.innerHTML = "<span style='color: cyan;'>[OK]</span> Quantum Secured Connection<br><span style='color: cyan;'>[OK]</span> Neural Link: Active";
        }
        else if (cmd === 'hack --all') {
            response.innerHTML = "<span style='color: #0f0;'>Initializing Matrix Overload...</span>";
            startMatrixEffect();
        }
        else if (cmd === '786') {
            response.innerHTML = "<span style='color: #d4af37;'>[REDIRECTING] Accessing Digital 786...</span>";
            setTimeout(() => window.location.href = 'modules/digital786/index.html', 1500);
        }
        else if (cmd === 'clear') {
            output.innerHTML = '';
            return;
        }
        else {
            response.innerHTML = "<span style='color: red;'>[ERROR] Unauthorized Command. Type 'help'.</span>";
        }
        
        output.appendChild(response);
        output.scrollTop = output.scrollHeight;
    }

    function startMatrixEffect() {
        let count = 0;
        let interval = setInterval(() => {
            let line = document.createElement('p');
            line.style.color = "#0f0";
            line.style.fontSize = "10px";
            line.innerText = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
            count++;
            if (count > 20) clearInterval(interval);
        }, 100);
    }
});
