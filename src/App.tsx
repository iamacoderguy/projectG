import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import AuthenticationForm from './app/features/auth/AuthenticationForm';
import MovieListPage from './app/features/movies/MovieListPage';

const App: React.FC = (props) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const renderMainPage = () => {
    let actions: React.ReactElement | null = null;
    if (isLoggedIn) {
      actions = <p>Logged In</p>;
    } else {
      actions = <AuthenticationForm onLogin={() => setIsLoggedIn(true)}/>;
    }

    return (
      <>
        <nav className="container">
          <div className="logo">
            <FontAwesomeIcon icon={faHome} /> Funny Movies
          </div>
          {actions}
        </nav>
        <MovieListPage />
      </>
    );
  };

  return renderMainPage();
};

export default App;
