import express, { Express } from 'express';
import error from '../middleware/error';

import auth from '../routes/auth';
import movie from '../routes/movie';

export default function (app: Express) {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(error);
  app.use('/api/auth', auth);
  app.use('/api/movie', movie);
}