// server.js

require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY.padEnd(32, ' '); // Ensure the key is 32 bytes
const IV_LENGTH = 16; // AES block size

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
}

app.post('/encrypt', (req, res) => {
    const { text } = req.body;
    const encryptedText = encrypt(text);
    res.json({ encryptedText });
});

app.post('/decrypt', (req, res) => {
    const { text } = req.body;
    const decryptedText = decrypt(text);
    res.json({ decryptedText });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

