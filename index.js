import QRCode from 'qrcode'

const generateQR = async text => {

    try {

        const qrCodeBase64 = await QRCode.toDataURL(text);
        const image = await QRCode.toString(text);

        return { qrCodeBase64, image };
    } catch (err) {
        console.error(err)
    }
}

const res = await generateQR('dsdsdsHjkGxUOFBpU6tEVIEqdsKK0HsBnV4=');

console.log(res.image);
console.log(res.qrCodeBase64);
