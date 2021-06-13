import { Response, NextFunction } from 'express';
import { verify } from '../services/auth';

export default function (req: any, res: Response, next: NextFunction) {
  const token = req.header('Authorization') || '';

  const { email, error } = verify(token.split(' ')[1]);

  if (error) {
    res.status(401).send(error.message);
  } else {
    req.email = email;
    next();
  }
}