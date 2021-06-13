import express, { Express } from 'express';
import error from '../middleware/error';
import auth from '../routes/auth';

export default function (app: Express) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(error);
  app.use('/api/auth', auth);
}