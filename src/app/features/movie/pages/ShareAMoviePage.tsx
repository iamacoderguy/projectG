import React, { useContext, useState } from 'react';
import Button from 'src/app/components/button/Button';
import Input from 'src/app/components/input/Input';
import './ShareAMoviePage.css';
import * as Yup from 'yup';
import { GlobalContext } from 'src/app/context/GlobalState';
import { Movie } from 'src/app/context/Movie';
import { getYoutubeId } from '../util';
import { useHistory } from 'react-router-dom';

const ShareAMoviePage: React.FC = () => {
  const [ url, setUrl ] = useState('');
  const [ urlTouched, setUrlTouched ] = useState(false);
  const [ isURLError, setIsURLError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const { movies, updateMovieList } = useContext(GlobalContext);
  const history = useHistory();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isURLValid(url)) {
      alert('Youtube URL is invalid');
      return;
    }

    const id = getYoutubeId(url);

    if (!id) {
      alert('Cannot get Youtube ID from the url');
      return;
    }

    const movie: Movie = {
      youtubeId: id,
      userEmail: 'someone@gmail.com',
      upVotes: 0,
      downVotes: 0,
      description: '',
      title: '',
    };

    setIsLoading(true);
    const newMovies = await shareAMovie(movie);
    if (!newMovies) {
      setIsLoading(false);
      return;
    }

    updateMovieList(newMovies);
    history.push('/');
  };

  const shareAMovie = async (movie: Movie) => {
    const newMovies = [ ...movies, movie ];
    try {
      await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_DROPBOX_KEY}`,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': JSON.stringify({
            path: process.env.REACT_APP_DROPBOX_PATH,
            mode: { '.tag': 'overwrite' },
          }),
        },
        body: JSON.stringify(newMovies),
      });

      return newMovies;
    } catch (error) {
      alert(error);
      return;
    }
  };

  const handleURLChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (!urlTouched || isURLValid(newValue)) {
      setIsURLError(false);
    } else {
      setIsURLError(true);
    }

    setUrl(newValue);
  };

  const handleURLBlur = () => {
    setUrlTouched(true);
  };

  const isURLValid = (value: string) => (value !== '' && Yup.string().url().isValidSync(value));

  return (
    <form action='' className='container shareAMovieForm' id='shareAMovieForm' onSubmit={handleFormSubmit}>
      <div id='leftDiv' className='cell'>
        <label htmlFor="youtubeURL">Youtube URL:</label>
      </div>
      <div id='rightDiv' className='cell'>
        <Input
          type='url'
          placeholder='https://www.youtube.com/watch?v=...'
          id='youtubeURL'
          onChange={handleURLChange}
          onBlur={handleURLBlur}
          isError={isURLError}
        />
        <Button disabled={!isURLValid(url) || isLoading}>Share</Button>
      </div>
    </form>
  );
};

export default ShareAMoviePage;