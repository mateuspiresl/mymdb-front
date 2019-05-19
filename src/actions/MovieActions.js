/* @flow */

import type { Dispatch } from 'redux';

import * as MoviesApi from '../api/MoviesApi';
import { errorParser } from '../utils/ActionUtils';
import * as types from './types';

const parseError = errorParser();

export function fetchMovie(id: number) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.MOVIES_FETCH });

    try {
      const data = await MoviesApi.getMovie(id);
      dispatch({ type: types.MOVIES_FETCH_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({ type: types.MOVIES_FETCH_FAIL, payload: parseError(error) });
    }
  };
}

export function fetchPopularMovies() {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.MOVIES_FETCH_MANY });

    try {
      const data = await MoviesApi.getManyMovies();
      dispatch({ type: types.MOVIES_FETCH_MANY_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({ type: types.MOVIES_FETCH_MANY_FAIL, payload: parseError(error) });
    }
  };
}

export function searchMoviesByTitle(title: string) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.MOVIES_FETCH_MANY, payload: { search: title } });

    try {
      const data = await MoviesApi.getManyMovies({ title });
      dispatch({
        type: types.MOVIES_FETCH_MANY_SUCCESS,
        payload: { data, search: title },
      });
    } catch (error) {
      dispatch({ type: types.MOVIES_FETCH_MANY_FAIL, payload: parseError(error) });
    }
  };
}
