import React, { useContext, useEffect, useState } from 'react';
import Movie from '../components/Movie';
import { Movie as MovieData } from 'src/app/context/Movie';
import './MovieListPage.css';
import * as stringUtils from 'src/app/utils/string';
import { GlobalContext } from 'src/app/context/GlobalState';

const youtubeAPIVideos = process.env.REACT_APP_YOUTUBE_DATA_API_HOST
  + '/videos?id={0}'
  + '&key=' + process.env.REACT_APP_YOUTUBE_DATA_API_KEY
  + '&part=snippet';

const MovieListPage: React.FC = () => {
  // TODO: handle load more

  const [ movies, setMovies ] = useState<MovieData[]>([]);
  const { movies: moviesWithoutYoutubeData ,updateMovieList } = useContext(GlobalContext);

  useEffect(() => {
    // Fetch data from database
    fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_DROPBOX_KEY}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: process.env.REACT_APP_DROPBOX_PATH,
        }),
      },
    })
      .then(async (res: Response) => {
        const result = await res.json();
        updateMovieList(result);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    const ids = moviesWithoutYoutubeData.map(m => m.youtubeId);

    // Fill pure data with youtube data
    fetch(stringUtils.format(youtubeAPIVideos, ids.join(',')))
      .then(async (res: Response) => {
        const result = await res.json();
        // TODO: Error handling,  id not found...
        setMovies(moviesWithoutYoutubeData.map((value, index) => ({
          ...value,
          title: result.items[index].snippet.title,
          description: result.items[index].snippet.description,
        })));
      })
      .catch((err) => {
        alert(err);
      });
  }, [ moviesWithoutYoutubeData ]);

  return (
    <div className='container movieListContainer'>
      {movies.map(m => {
        return (
          <Movie
            key={m.youtubeId}
            className='movieComponent'
            movie={m}
          />
        );
      },
      )}
    </div>
  );
};

export default MovieListPage;