// seperating app and server is a tip to resolve EADDRINUSE error during testing
// ref: http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

import express from 'express';
const app = express();

import logging from './logging';
import cors from './cors';
import routes from './routes';
import config from './config';
import prod from './prod';

logging(app);
cors(app);
routes(app);
config();
prod(app);

export default app;