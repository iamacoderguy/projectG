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

  const { token, updateMovieList } = useContext(GlobalContext);
  const history = useHistory();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isURLValid(url)) {
      alert('Youtube URL is invalid');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_HOST}/api/movie`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          youtubeURL: url,
        }),
      });

      if (res.status === 401) {
        throw(await res.text());
      }

      const newMovies = await res.json();
      updateMovieList(newMovies);
      history.push('/');
    } catch (error) {
      alert(error);
      setIsLoading(false);
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