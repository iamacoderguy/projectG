import request from 'request-promise';
import config from 'config';
import Debug from 'debug';
import * as stringUtils from '../helpers/string';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = Debug('funny-movies:movie-service');
const youtubeAPIVideos = config.get('youtubeDataAPIHost')
  + '/videos?id={0}'
  + '&key=' + config.get('youtubeDataAPIKey')
  + '&part=snippet';

export type Movie = {
  title: string;
  userEmail: string;
  upVotes: number;
  downVotes: number;
  description: string;
  youtubeId: string;
}

export const getMovies = async () => {
  let result = await request.post('https://content.dropboxapi.com/2/files/download', {
    headers: {
      Authorization: `Bearer ${config.get('dropboxKey')}`,
      'Dropbox-API-Arg': JSON.stringify({
        path: config.get('dropboxMoviePath'),
      }),
    },
  });

  const movies = JSON.parse(result) as Movie[];
  const ids = movies.map(m => m.youtubeId);

  result = await request.get(stringUtils.format(youtubeAPIVideos, ids.join(',')));
  result = JSON.parse(result);

  const moviesWithYoutubeData = movies.map((value, index) => ({
    ...value,
    title: result.items[index].snippet.title,
    description: result.items[index].snippet.description,
  }));

  return moviesWithYoutubeData;
};

export const shareAMovie = async (youtubeURL: string, email: string) => {
  const id = getYoutubeId(youtubeURL);
  if (!id) {
    throw('Cannot get Youtube ID from the url');
  }

  const movie: Movie = {
    youtubeId: id,
    userEmail: email,
    upVotes: 0,
    downVotes: 0,
    description: '',
    title: '',
  };

  const movies = await getMovies();

  const newMovies = [ ...movies, movie ];
  await request.post('https://content.dropboxapi.com/2/files/upload', {
    headers: {
      Authorization: `Bearer ${config.get('dropboxKey')}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path: config.get('dropboxMoviePath'),
        mode: { '.tag': 'overwrite' },
      }),
    },
    body: JSON.stringify(newMovies),
  });

  return newMovies;
};

export const getYoutubeId = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
};