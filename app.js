import QRCode from 'qrcode'
import crypto from 'crypto';

const generateQR = async text => {

    try {

        const qrCodeBase64 = await QRCode.toDataURL(text);
        const image = await QRCode.toString(text);

        return { qrCodeBase64, image };
    } catch (err) {
        console.error(err)
    }
}

function encrypt(textToEncrypt, key) {
    const keySize = 16; // 128 bits
    const blockSize = 16; // 128 bits

    const pwdBytes = Buffer.from(key, 'utf8');
    const keyBytes = Buffer.alloc(keySize);
    pwdBytes.copy(keyBytes, 0, 0, Math.min(pwdBytes.length, keySize));

    const iv = keyBytes;

    const cipher = crypto.createCipheriv('aes-128-cbc', keyBytes, iv);
    cipher.setAutoPadding(true);

    let encrypted = cipher.update(textToEncrypt, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted;
}

function decrypt(textToDecrypt, key) {
    const keySize = 16; // 128 bits
    const blockSize = 16; // 128 bits

    const pwdBytes = Buffer.from(key, 'utf8');
    const keyBytes = Buffer.alloc(keySize);
    pwdBytes.copy(keyBytes, 0, 0, Math.min(pwdBytes.length, keySize));

    const iv = keyBytes;

    const decipher = crypto.createDecipheriv('aes-128-cbc', keyBytes, iv);
    decipher.setAutoPadding(true);

    let decrypted = decipher.update(textToDecrypt, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

const key = 'oDAKdaw112349DWd';

// const cleanedText = JSON.stringify({ OrderId: "1239" });
// console.log('Texto Limpo:', cleanedText);

let encrypted1Text = '';
// encrypted1Text = encrypt(cleanedText, key);
encrypted1Text = 'HjkGxUOF8u4avHK9mrz63fk7vBpU6tEVIEqKK0HBnV4=';
// encrypted1Text = 'pMrj8lO1yr+Z5jTUFJ3tL0dBJ8+ErHMkpdrsGG7w45w=';
// console.log('Texto criptografado:', encrypted1Text);

// DECRYPT
const decryptedText = decrypt(encrypted1Text, key);
console.log(decryptedText);


const res = await generateQR(encrypted1Text);
console.log(res.image);
console.log(res.qrCodeBase64);