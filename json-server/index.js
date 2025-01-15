const https = require('https');
const jsonServer = require('json-server');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('./src/data/DataSettings.json');
const middlewares = jsonServer.defaults();

const envFile = path.join(__dirname, '../.env');

fs.readFile(envFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file .env:', err);
        return;
    }

    const envData = {};

    data.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envData[key.trim()] = value.trim();
        }
    });

    const FRONTEND_HTTPS = envData.REACT_APP_FRONTEND_HTTPS;
    const FRONTEND_IP = envData.REACT_APP_FRONTEND_IP;
    const FRONTEND_SETTINGS_PORT = envData.REACT_APP_FRONTEND_SETTINGS_PORT;
    const SSL_CRT_FILE = envData.SSL_CRT_FILE;
    const SSL_KEY_FILE = envData.SSL_KEY_FILE;

    const options = {
        cert: fs.readFileSync(SSL_CRT_FILE),
        key: fs.readFileSync(SSL_KEY_FILE),
    };

    server.use(cors());
    server.use(jsonServer.bodyParser);
    server.use(middlewares);
    server.use(router);

    if (FRONTEND_HTTPS === 'true') {
        https.createServer(options, server).listen(FRONTEND_SETTINGS_PORT, () => {
            console.log(`JSON Server is running at https://${FRONTEND_IP}:${FRONTEND_SETTINGS_PORT}`);
        });
    } else {
        server.listen(FRONTEND_SETTINGS_PORT, () => {
            console.log(`JSON Server is running at http://${FRONTEND_IP}:${FRONTEND_SETTINGS_PORT}`);
        })
    }
});
