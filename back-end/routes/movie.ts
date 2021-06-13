import express, { Request, Response } from 'express';
import Debug from 'debug';
import { getMovies, Movie, shareAMovie } from '../services/movie';
import auth from '../middleware/auth';

const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = Debug('funny-movies:movie-route');

router.get('/', async (req: Request, res: Response) => {
  try {
    const movies: Movie[] = await getMovies();
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/share', auth, async (req: any, res: Response) => {
  if(!req.body.youtubeURL){
    res.status(400).send('Invalid details!');
    return;
  }

  try {
    const movies: Movie[] = await shareAMovie(req.body.youtubeURL, req.email);
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;