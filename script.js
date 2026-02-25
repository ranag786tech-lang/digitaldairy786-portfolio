document.addEventListener('DOMContentLoaded', () => {
    const cmdInput = document.getElementById('command-line');
    
    if (cmdInput) {
        cmdInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const cmd = this.value.toLowerCase().trim();
                
                if(cmd === 'github') {
                    window.open('https://github.com', '_blank');
                } else if(cmd === 'clear') {
                    console.clear();
                    alert('Terminal Cleared!');
                } else if(cmd === 'hello') {
                    alert('Welcome to DG Universe, Commander!');
                } else {
                    alert('Executing System Command: ' + cmd);
                }
                
                this.value = ''; // Input clear karne ke liye
            }
        });
    }

    console.log("DG Universe System Online and Linked.");
});
