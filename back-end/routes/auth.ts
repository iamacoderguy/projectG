import express, { Request, Response } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import request from 'request-promise';
import Debug from 'debug';

const secret = config.get('jwtPrivateKey') as string;
const router = express.Router();
const debug = Debug('funny-movies:auth');

type User = {
  email: string;
  password: string;
}

router.post('/login-or-register', async (req: Request, res: Response) => {
  if(!req.body.email || !req.body.password){
    res.status(400).send('Invalid details!');
    return;
  }

  const users: User[] | undefined = await getUsers();

  if (!users) {
    res.status(500);
    res.send('Cannot get users');
    return;
  }

  const existingUsers = users.filter((user: any) => user.email === req.body.email);

  if (existingUsers.length !== 0) {
    debug('Logging in...');
    login(req, res, existingUsers[0]);
    return;
  }

  debug('Signing up...');
  const newUser: User = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!await updateUsers([ ...users, newUser ])) {
    res.status(500);
    res.send('Cannot create user');
    return;
  }

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

const getUsers = async () => {
  try {
    const result = await request.post('https://content.dropboxapi.com/2/files/download', {
      headers: {
        Authorization: `Bearer ${config.get('dropboxKey')}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: config.get('dropboxPath'),
        }),
      },
    });

    return JSON.parse(result) as User[];
  } catch (error) {
    debug(error);
    return;
  }
};

const updateUsers = async (users: User[]) => {
  try {
    await request.post('https://content.dropboxapi.com/2/files/upload', {
      headers: {
        Authorization: `Bearer ${config.get('dropboxKey')}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: config.get('dropboxPath'),
          mode: { '.tag': 'overwrite' },
        }),
      },
      body: JSON.stringify(users),
    });

    return true;
  } catch (error) {
    debug(error);
    return false;
  }
};

export default router;