import React from 'react';
import { Movie as MovieData } from '../Movie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import './Movie.css';
import { truncate } from 'src/app/utils/string';

type MovieProps = {
  movie: MovieData;
  className?: string;
}

const Movie: React.FC<MovieProps> = (props) => {
  const { movie, className } = props;
  return (
    <div className={[ 'movieContainer', className ].join(' ')}>
      <div className='video'>
        <iframe
          src={`https://www.youtube.com/embed/${movie.youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <div className='info'>
        <strong>{movie.title}</strong>
        <p>Shared by: {movie.userEmail}</p>
        <div>
          <span>{movie.upVotes} <FontAwesomeIcon icon={faThumbsUp}/></span>
          <span>{movie.downVotes} <FontAwesomeIcon icon={faThumbsDown}/></span>
        </div>
        <p>Description:</p>
        <i>{truncate(movie.description, 300)}</i>
      </div>
    </div>
  );
};

export default Movie;