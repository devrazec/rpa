const https = require('https');
const jsonServer = require('json-server');
const cors = require('cors');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('./src/data/DataSettings.json');
const middlewares = jsonServer.defaults();
const port = 3001;

const serverIp = process.env.REACT_APP_SERVER_IP;

// HTTPS options
const options = {
    key: fs.readFileSync('./certs/private.key'),
    cert: fs.readFileSync('./certs/certificate.crt'),
};

// Middleware
server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

// Create HTTPS server
https.createServer(options, server).listen(port, () => {
    console.log(`JSON Server is running at https://${serverIp}:${port}`);
});
