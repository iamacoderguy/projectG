import React from 'react';
import Movie from '../components/Movie';
import './MovieListPage.css';

const MovieListPage: React.FC = (props) => {
  // TODO: handle load more
  // TODO: get info from youtube
  return (
    <div className='container movieListContainer'>
      <Movie
        className='movieComponent'
        movie={{
          title: 'Movie Title',
          userEmail: 'someone@gmail.com',
          upVotes: 86,
          downVotes: 12,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget purus vitae risus consectetur iaculis nec eget neque. Suspendisse in sem malesuada, commodo eros sit amet, dignissim nisl. Sed diam augue, suscipit at tincidunt sit amet, molestie dictum libero. Aliquam eros mi, rutrum eu gravida ut, convallis sed tortor. Praesent sed tincidunt velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas',
          youtubeId: 'rokGy0huYEA',
        }}/>
      <Movie
        className='movieComponent'
        movie={{
          title: 'Movie Title',
          userEmail: 'someone@gmail.com',
          upVotes: 86,
          downVotes: 12,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget purus vitae risus consectetur iaculis nec eget neque. ',
          youtubeId: 'rokGy0huYEA',
        }}/>
      <Movie
        className='movieComponent'
        movie={{
          title: 'Movie Title',
          userEmail: 'someone@gmail.com',
          upVotes: 86,
          downVotes: 12,
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
          youtubeId: 'rokGy0huYEA',
        }}/>
    </div>
  );
};

export default MovieListPage;