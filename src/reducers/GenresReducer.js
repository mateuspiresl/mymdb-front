/* @flow */

import * as types from '../actions/types';
import type { Genre } from '../types/apiTypes';
import type { Action } from '../types/reduxTypes';

type State = {
  +data: Array<Genre>,
  +map: { [key: string]: Genre },
  +loading: boolean,
  +error: string | null,
};

const initialState: State = {
  data: [],
  map: {},
  loading: false,
  error: null,
};

function createMap(data: Array<Genre>) {
  const map = {};

  data.forEach((genre: Genre) => {
    map[genre.id] = genre;
  });

  return map;
}

export default function GenresReducer(
  state: State = initialState,
  { type, payload = {} }: Action,
): State {
  switch (type) {
    case types.GENRES_FETCH_MANY:
      return { ...state, loading: true, error: null };

    case types.GENRES_FETCH_MANY_SUCCESS:
      return {
        ...state,
        data: payload.data,
        map: createMap(payload.data),
        loading: false,
      };

    case types.GENRES_FETCH_MANY_FAIL:
      return { ...state, error: payload.error, loading: false };

    default: return state;
  }
}
