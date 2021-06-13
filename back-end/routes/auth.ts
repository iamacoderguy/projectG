import express, { Request, Response } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
const secret = config.get('jwtPrivateKey') as string;

const router = express.Router();

type User = {
  email: string;
  password: string;
}

const users: User[] = [];

router.post('/login-or-register', (req: Request, res: Response) => {

  console.log(req);

  if(!req.body.email || !req.body.password){
    res.status(400).send('Invalid details!');
    return;
  }

  const existingUsers = users.filter(user => user.email === req.body.email);

  if (existingUsers.length !== 0) {
    login(req, res, existingUsers[0]);
    return;
  }

  const newUser: User = {
    email: req.body.email,
    password: req.body.password,
  };

  // TODO: Add user to db
  users.push(newUser);

  generateAndSendTokenToClient(req, res, newUser);
});

const login = (req: Request, res: Response, user: User) => {
  if (user.password !== req.body.password) {
    res.status(401).send('Wrong email or password!');
    return;
  }

  generateAndSendTokenToClient(req, res, user);
};

const generateAndSendTokenToClient = (req: Request, res: Response, user: User) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  res.status(200).send(token);
};

export default router;