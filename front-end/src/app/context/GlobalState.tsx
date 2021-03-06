import React, { createContext, useReducer } from 'react';
import AppReducer, { AppState } from './AppReducer';
import { Movie } from './Movie';

// initial state
const initialState: AppState = {
  movies: [],
  updateMovieList: () => {
    alert('unknown updateMovieList');
  },
  loggedIn: () => {
    alert('unknown loggedIn');
  },
  loggedOut: () => {
    alert('unknown loggedOut');
  },
  token: '',
  email: '',
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider: React.FC = (props) => {
  const [ state, dispatch ] = useReducer(AppReducer, initialState);

  // actions
  const updateMovieList = (movies: Movie[]) => {
    dispatch({ type: 'UPDATE_MOVIE_LIST', payload: movies });
  };

  const loggedIn = (token: string, email: string) => {
    dispatch({ type: 'LOGGED_IN', payload: { email, token } });
  };

  const loggedOut = () => {
    dispatch({ type: 'LOGGED_OUT', payload: undefined });
  };

  return (
    <GlobalContext.Provider
      value={{
        movies: state.movies,
        updateMovieList,
        loggedIn,
        loggedOut,
        token: state.token,
        email: state.email,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
