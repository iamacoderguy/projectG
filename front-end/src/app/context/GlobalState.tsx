import React, { createContext, useReducer } from 'react';
import AppReducer, { AppState } from './AppReducer';
import { Movie } from './Movie';

// initial state
const initialState: AppState = {
  movies: [],
  updateMovieList: () => {
    alert('unknown updateMovieList');
  },
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

  return (
    <GlobalContext.Provider
      value={{
        movies: state.movies,
        updateMovieList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
