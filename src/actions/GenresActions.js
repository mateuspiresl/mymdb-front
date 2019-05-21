/* eslint-disable import/prefer-default-export */
/* @flow */

import * as GenresApi from '../api/GenresApi';
import { errorParser } from '../utils/ActionUtils';
import * as types from './types';
import type { Dispatch } from '../types/reduxTypes';

const parseError = errorParser();

export function fetchGenresList() {
  return async (dispatch: Dispatch) => {
    dispatch({ type: types.GENRES_FETCH_MANY });

    try {
      const data = await GenresApi.getManyGenres();

      dispatch({
        type: types.GENRES_FETCH_MANY_SUCCESS,
        payload: { data },
      });
    } catch (error) {
      dispatch({
        type: types.GENRES_FETCH_MANY_FAIL,
        payload: { ...parseError(error) },
      });
    }
  };
}
