import express, { Request, Response } from 'express';
import Debug from 'debug';
import { 
  generateToken,
  getUsers,
  updateUsers,
  User,
} from '../services/auth';

const router = express.Router();
const debug = Debug('funny-movies:auth-route');

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

  const token = generateToken(newUser);
  res.status(200).send(token);
});

const login = (req: Request, res: Response, user: User) => {
  if (user.password !== req.body.password) {
    res.status(401).send('Wrong email or password!');
    return;
  }

  const token = generateToken(user);
  res.status(200).send(token);
};

export default router;