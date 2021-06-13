import React, { useState } from 'react';
import Button from 'src/app/components/button/Button';
import Input from 'src/app/components/input/Input';
import './ShareAMoviePage.css';
import * as Yup from 'yup';

const ShareAMoviePage: React.FC = () => {
  const [ url, setUrl ] = useState('');
  const [ urlTouched, setUrlTouched ] = useState(false);
  const [ isURLError, setIsURLError ] = useState(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isURLValid(url)) {
      // Do share procedure
      alert('Share: ' + url);
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
        <Button disabled={!isURLValid(url)}>Share</Button>
      </div>
    </form>
  );
};

export default ShareAMoviePage;