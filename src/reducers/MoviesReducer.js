/* @flow */

import { Action } from 'redux';

import * as types from '../actions/types';

type Movie = Object;

type MovieState = {
  data: Movie,
  loading: boolean,
  error: string | null,
};

type ListState = {
  search: string,
  data: Array<Movie>,
  page: number,
  hasMore: boolean,
  loading: boolean,
  error: string | null,
};

type State = {
  movie: MovieState,
  list: ListState,
};

const initialState: State = {
  movie: {
    data: null,
    loading: false,
    error: null,
  },
  list: {
    search: '',
    data: [],
    page: 0,
    hasMore: false,
    loading: false,
    error: null,
  },
};

function movieReducer(state: MovieState, { type, payload }: Action): MovieState {
  switch (type) {
    case types.MOVIES_FETCH:
      return { ...state, data: null, loading: true };

    case types.MOVIES_FETCH_SUCCESS:
      return { ...state, data: payload.data, loading: false };

    case types.MOVIES_FETCH_FAIL:
      return { ...state, error: payload.error, loading: false };

    default: return state;
  }
}

function listReducer(state: ListState, { type, payload }: Action): ListState {
  // Ignore responses for different search strings
  if (state.search !== payload.search) {
    return state;
  }

  switch (type) {
    case types.MOVIES_FETCH:
      return { ...state, search: payload.search, loading: true };

    case types.MOVIES_FETCH_MANY_SUCCESS:
      if (payload.page === 0) {
        return {
          ...state,
          list: payload.data.results,
          page: payload.data.page,
          loading: false,
        };
      }

      if (payload.page === state.page + 1) {
        return {
          ...state,
          list: [...state.data, payload.data.results],
          page: payload.data.page,
          loading: false,
        };
      }

      return { ...state, loading: false };

    case types.MOVIES_FETCH_MANY_FAIL:
      return { ...state, error: payload.error, loading: false };

    default: return state;
  }
}

export default function AuthReducer(
  state: State = initialState,
  { type, payload }: Action,
): State {
  switch (type) {
    case types.MOVIES_FETCH:
    case types.MOVIES_FETCH_SUCCESS:
    case types.MOVIES_FETCH_FAIL:
      return { ...state, movie: movieReducer(state.movie, payload) };

    case types.MOVIES_FETCH_MANY:
    case types.MOVIES_FETCH_MANY_SUCCESS:
    case types.MOVIES_FETCH_MANY_FAIL:
      return { ...state, list: listReducer(state.list, payload) };

    default: return state;
  }
}
