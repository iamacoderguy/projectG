import Debug from 'debug';
import config from 'config';

const debug = Debug('servera:config');

export default function () {
  debug(config.get('name'));

  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}