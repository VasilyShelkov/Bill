const express = require('express');
const createServer = require('./server');

const app = express();
const port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const serverIpAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

createServer(app, port, serverIpAddress);
