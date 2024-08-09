async function encryptText() {
    const text = document.getElementById('text').value;
    const response = await fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    const data = await response.json();
    const encryptedOutput = document.getElementById('encrypted-output');
    encryptedOutput.textContent = 'Encrypted: ' + data.encryptedText;
}

async function decryptText() {
    const text = document.getElementById('text').value;
    const response = await fetch('/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    const data = await response.json();
    const decryptedOutput = document.getElementById('decrypted-output');
    decryptedOutput.textContent = 'Decrypted: ' + data.decryptedText;
}
