import winston from 'winston';
import app from './startup/app';

console.info('To enable debug mode, set env DEBUG=servera:*');

const port = 3001;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;