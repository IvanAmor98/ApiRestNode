import express from 'express';
import https, { ServerOptions } from 'https';
import http from 'http';
import fs from 'fs';
import { json } from 'body-parser';
import { globalRouter } from './router/router';
import pem from 'pem';
import os from 'process';
import path from 'path';
import cors from 'cors';

const app = express();
const router = express.Router();
const httpPort = 8080;
const httpsPort = 8443;

router.use('/api', globalRouter);

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(json());
app.use(router);

const httpServer = http.createServer(app);
httpServer.listen(httpPort, () => {
    console.log('http listening on port %s...', httpPort);
});

if (os.platform === 'win32') {
    process.env.OPENSSL_CONF = path.join(__dirname, 'openssl', 'windows', 'openssl.cnf');
    pem.config({
      pathOpenSSL: path.join(__dirname, 'openssl', 'windows', 'openssl.exe')
    });
  }

const certProps = {
    days: 1,
    selfSigned: true,
};

pem.createCertificate(certProps, (error: any, keys: any) => {
    if (error) {
      throw error;
    }
    const credentials = { key: keys.serviceKey, cert: keys.certificate } as ServerOptions;

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort, () => {
        console.log('https listening on port %s...', httpsPort);
    });
  });

