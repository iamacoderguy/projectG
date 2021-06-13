import jwt from 'jsonwebtoken';
import request from 'request-promise';
import config from 'config';
import Debug from 'debug';

const debug = Debug('funny-movies:auth-service');
const secret = config.get('jwtPrivateKey') as string;

export type User = {
  email: string;
  password: string;
}

export const generateToken = (user: User) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    secret,
    {
      expiresIn: '1h',
    },
  );

  return token;
};

export const getUsers = async () => {
  try {
    const result = await request.post('https://content.dropboxapi.com/2/files/download', {
      headers: {
        Authorization: `Bearer ${config.get('dropboxKey')}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: config.get('dropboxUserPath'),
        }),
      },
    });

    return JSON.parse(result) as User[];
  } catch (error) {
    debug(error);
    return;
  }
};

export const updateUsers = async (users: User[]) => {
  try {
    await request.post('https://content.dropboxapi.com/2/files/upload', {
      headers: {
        Authorization: `Bearer ${config.get('dropboxKey')}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: config.get('dropboxUserPath'),
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

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      email: (decoded as User).email,
      error: undefined,
    };
  } catch (error) {
    return {
      email: undefined,
      error,
    };
  }
};