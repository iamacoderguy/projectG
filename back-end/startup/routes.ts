import express, { Express } from 'express';
import error from '../middleware/error';
import authMiddleWare from '../middleware/auth';

import auth from '../routes/auth';
import movie from '../routes/movie';

export default function (app: Express) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(error);
  app.use('/api/auth', auth);
  app.use(authMiddleWare);
  app.use('/api/movie', movie);
}