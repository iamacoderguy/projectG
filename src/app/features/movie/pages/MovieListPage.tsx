import React, { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import { Movie as MovieData } from '../Movie';
import './MovieListPage.css';

// TODO: Move to env
// AIzaSyBqi9Po4moldIyK002uTe50vxsbxjtwOtQ
// https://www.googleapis.com/youtube/v3/videos?id=rokGy0huYEA&key=AIzaSyBqi9Po4moldIyK002uTe50vxsbxjtwOtQ&part=snippet,contentDetails,statistics,status

const sharedList: MovieData[] = [
  {
    youtubeId: 'rokGy0huYEA',
    userEmail: 'someone@gmail.com',
    upVotes: 86,
    downVotes: 12,
    description: '',
    title: '',
  },
  {
    youtubeId: '94xpmb5UvNg',
    userEmail: 'someone@gmail.com',
    upVotes: 86,
    downVotes: 12,
    description: '',
    title: '',
  },
  {
    youtubeId: 'FPtITmtjWhQ',
    userEmail: 'someone@gmail.com',
    upVotes: 86,
    downVotes: 12,
    description: '',
    title: '',
  },
];

const key = 'AIzaSyBqi9Po4moldIyK002uTe50vxsbxjtwOtQ';

const MovieListPage: React.FC = (props) => {
  // TODO: handle load more

  const [ movies, setMovies ] = useState<MovieData[]>([]);

  useEffect(() => {
    const ids = sharedList.map(shared => shared.youtubeId);

    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${ids.join(',')}&key=${key}&part=snippet,contentDetails,statistics,status`)
      .then(res => res.json())
      .then(
        (result) => {
          // TODO: Error handling,  id not found...
          setMovies(sharedList.map((value, index) => ({
            ...value,
            title: result.items[index].snippet.title,
            description: result.items[index].snippet.description,
          })));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        },
      );
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