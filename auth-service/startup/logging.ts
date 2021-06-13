import Debug from 'debug';
import morgan from 'morgan';
import winston from 'winston';
import { Express } from 'express';
require('express-async-errors');

const debug = Debug('servera:config');

export default function (app: Express) {
  if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
  }

  winston.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.simple()),
  }));
  winston.add(new winston.transports.File({ filename: './_logs/logfile.log' }));

  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: './_logs/uncaughtExceptions.log' }),
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
}