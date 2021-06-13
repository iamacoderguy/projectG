import React, { useContext } from 'react';
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
import { GlobalContext } from './app/context/GlobalState';
import { isNullOrWhitespace } from './app/utils/string';

// TODO: Handle responsive
// TODO: Write unit tests and integration tests
// TODO: Up vote and down vote

const App: React.FC = () => {
  const history = useHistory();

  const { token, email, loggedOut } = useContext(GlobalContext);

  const handleShareAMovie = () => {
    history.push('/share');
  };

  const handleLogout = () => {
    loggedOut();
  };

  const renderMainPage = () => {
    let actions: React.ReactElement | null = null;
    if (!isNullOrWhitespace(token)) {
      actions = (
        <div className='actionContainer'>
          <p>{email || ''}</p>
          <Button onClick={handleShareAMovie}>Share a movie</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      );
    } else {
      actions = <AuthenticationForm />;
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
