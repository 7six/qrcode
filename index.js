import http from 'http';
import QRCode from 'qrcode'

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url.startsWith('/image')) {

        const url = new URL(req.url, `http://${req.headers.host}`);
        const code = url.searchParams.get('code');

        if (code) {
            try {

                const imageBuffer = await QRCode.toBuffer(code, {
                    margin: 0.1,
                    width: 350
                });

                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': imageBuffer.length
                });

                res.end(imageBuffer);
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    'error': 'image is unavailable'
                }));
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                'error': 'code is required'
            }));
        }
    } else {
        console.log('xtp');
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            'error': 'route not found'
        }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`server on ${PORT}`);
});