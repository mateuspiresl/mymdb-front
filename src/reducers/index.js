/* @flow */

import { combineReducers } from 'redux';

import MoviesReducer from './MoviesReducer';
import GenresReducer from './GenresReducer';

export default combineReducers({
  movies: MoviesReducer,
  genres: GenresReducer,
});
