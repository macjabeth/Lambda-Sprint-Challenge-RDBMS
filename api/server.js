const debug = require('debug')('server:log');
const compression = require('compression');
const helmet = require('helmet');
const projects = require('../routes/projects');
const actions = require('../routes/actions');
const contexts = require('../routes/contexts');
const express = require('express');
const server = express();

// Middleware
server.use(express.json());
server.use(compression());
server.use(helmet());
server.use((req, res, next) => {
  res.on('finish', () =>
    debug(`${req.method} ${req.originalUrl} - ${res.statusCode} [${res.statusMessage}]`));
  next();
});

// Routes
server.use('/api/projects', projects);
server.use('/api/actions', actions);
server.use('/api/contexts', contexts);

server.use('/api', (req, res) => {
  res.status(418).json({ message: "It's working! It's working!!!" });
});

module.exports = server;
