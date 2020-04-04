/* @flow */

import * as MoviesApi from '../api/MoviesApi';
import { errorParser } from '../utils/ActionUtils';
import * as types from './types';
import type { Dispatch } from '../types/reduxTypes';

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

export function fetchMoviesList(title: string, page?: number = 1) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.MOVIES_FETCH_MANY, payload: { search: title } });

    try {
      const data = await MoviesApi.getManyMovies({ title }, page);
      dispatch({
        type: types.MOVIES_FETCH_MANY_SUCCESS,
        payload: { data, search: title },
      });
    } catch (error) {
      dispatch({
        type: types.MOVIES_FETCH_MANY_FAIL,
        payload: { ...parseError(error), search: title },
      });
    }
  };
}
