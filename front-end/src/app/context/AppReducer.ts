import { Movie } from './Movie';

export type AppState = {
  movies: Movie[],
  updateMovieList: (movies: Movie[]) => void,
  loggedIn: (token: string, email: string) => void,
  loggedOut: () => void,
  token: string,
  email: string,
}
const AppReducer = (state: AppState, { type, payload } : {type: string, payload: any}) => {
  switch (type) {
    case 'LOGGED_IN':
      return {
        ...state,
        token: payload.token,
        email: payload.email,
      };

    case 'LOGGED_OUT':
      return {
        ...state,
        token: '',
        email: '',
      };

    case 'UPDATE_MOVIE_LIST':
      return {
        ...state,
        movies: [ ...payload ],
      };

    default:
      return state;
  }
};

export default AppReducer;
