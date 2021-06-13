import { Movie } from './Movie';

export type AppState = {
  movies: Movie[],
  updateMovieList: (movies: Movie[]) => void,
}
const AppReducer = (state: AppState, { type, payload } : {type: string, payload: any}) => {
  switch (type) {
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
