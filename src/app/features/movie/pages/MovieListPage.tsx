import React, { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import { Movie as MovieData } from '../Movie';
import './MovieListPage.css';

// AIzaSyBqi9Po4moldIyK002uTe50vxsbxjtwOtQ
// https://www.googleapis.com/youtube/v3/videos?id=rokGy0huYEA&key=AIzaSyBqi9Po4moldIyK002uTe50vxsbxjtwOtQ&part=snippet,contentDetails,statistics,status

const sharedList = [
  {
    id: 'rokGy0huYEA',
    sharedBy: 'someone@gmail.com',
  },
  {
    id: '94xpmb5UvNg',
    sharedBy: 'someone@gmail.com',
  },
  {
    id: 'FPtITmtjWhQ',
    sharedBy: 'someone@gmail.com',
  },
];

const key = 'AIzaSyBqi9Po4moldIyK002uTe50vxsbxjtwOtQ';

const MovieListPage: React.FC = (props) => {
  // TODO: handle load more
  // TODO: get info from youtube

  const [ movies, setMovies ] = useState<MovieData[]>([]);

  useEffect(() => {
    const ids = sharedList.map(shared => shared.id);
    console.log(`https://www.googleapis.com/youtube/v3/videos?id=${ids.join(',')}
    &key=${key}
    &part=snippet,contentDetails,statistics,status`);

    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${ids.join(',')}&key=${key}&part=snippet,contentDetails,statistics,status`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.items.length);
          setMovies(result.items.map((item: any) => {
            return {
              title: item.snippet.title,
              userEmail: 'someone@gmail.com',
              description: item.snippet.description,
              upVotes: 86,
              downVotes: 12,
              youtubeId: item.id,
            };
          }));
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