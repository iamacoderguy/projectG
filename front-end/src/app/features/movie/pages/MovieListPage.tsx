import React, { useContext, useEffect } from 'react';
import Movie from '../components/Movie';
import './MovieListPage.css';
import { GlobalContext } from 'src/app/context/GlobalState';

const MovieListPage: React.FC = () => {
  // TODO: handle load more
  const { movies ,updateMovieList } = useContext(GlobalContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/api/movie`, {
      method: 'GET',
    })
      .then(async (res: Response) => {
        const result = await res.json();
        updateMovieList(result);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

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