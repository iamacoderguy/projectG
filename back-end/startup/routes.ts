import express, { Express } from 'express';
import error from '../middleware/error';

export default function (app: Express) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(error);
}