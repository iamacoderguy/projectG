import React, { useState } from 'react';
import { 
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import AuthenticationForm from './app/features/auth/AuthenticationForm';
import MovieListPage from './app/features/movie/pages/MovieListPage';
import Button from './app/components/button/Button';
import ShareAMoviePage from './app/features/movie/pages/ShareAMoviePage';

const App: React.FC = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const history = useHistory();

  const handleShareAMovie = () => {
    history.push('/share');
  };

  const handleLogout = () => {
    // Do logout procedure from auth module
    setIsLoggedIn(false);
  };

  const renderMainPage = () => {
    let actions: React.ReactElement | null = null;
    if (isLoggedIn) {
      actions = (
        <div className='actionContainer'>
          <p>Welcome someone@email.com</p>
          <Button onClick={handleShareAMovie}>Share a movie</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      );
    } else {
      actions = <AuthenticationForm onLogin={() => setIsLoggedIn(true)}/>;
    }

    return (
      <>
        <nav className='container'>
          <div className='logo'>
            <FontAwesomeIcon icon={faHome} /> Funny Movies
          </div>
          {actions}
        </nav>
        <Switch>
          <Route path="/" exact>
            {/* Get logged in user info from auth module and pass to movie */}
            <MovieListPage />
          </Route>

          <Route path="/share">
            <ShareAMoviePage />
          </Route>
        </Switch>
      </>
    );
  };

  return renderMainPage();
};

export default App;
