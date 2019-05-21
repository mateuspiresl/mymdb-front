/* @flow */

import * as types from '../actions/types';
import type { Movie, PartialMovie } from '../types/apiTypes';
import type { Action } from '../types/reduxTypes';

type MovieState = {
  +data: ?Movie,
  +loading: boolean,
  +error: ?string,
};

type ListState = {
  +search: string,
  +data: PartialMovie[],
  +page: number,
  +hasMore: boolean,
  +loading: boolean,
  +error: ?string,
};

type State = {
  +movie: MovieState,
  +list: ListState,
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
    loadedOnce: false,
    error: null,
  },
};

function parseData(data: Movie | PartialMovie) {
  return {
    ...data,
    release_date: data.release_date ? new Date(data.release_date).toLocaleDateString() : null,
  };
}

function movieReducer(state: MovieState, { type, payload = {} }: Action): MovieState {
  switch (type) {
    case types.MOVIES_FETCH:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };

    case types.MOVIES_FETCH_SUCCESS:
      return {
        ...state,
        data: parseData(payload.data),
        loading: false,
      };

    case types.MOVIES_FETCH_FAIL:
      return { ...state, error: payload.error, loading: false };

    default: return state;
  }
}

function listReducer(state: ListState, { type, payload = {} }: Action): ListState {
  switch (type) {
    case types.MOVIES_FETCH_MANY:
      return {
        ...state,
        search: payload.search,
        data: state.search === payload.search ? state.data : [],
        loading: true,
        loadedOnce: true,
        error: null,
      };

    case types.MOVIES_FETCH_MANY_SUCCESS:
      // Ignore responses for different search strings
      if (state.search !== payload.search) {
        return state;
      }

      if (payload.data.page === 1) {
        return {
          ...state,
          data: payload.data.results.map(parseData),
          page: payload.data.page,
          hasMore: payload.data.total_pages > payload.data.page,
          loading: false,
        };
      }

      if (payload.data.page === state.page + 1) {
        return {
          ...state,
          data: [...state.data, ...payload.data.results.map(parseData)],
          page: payload.data.page,
          hasMore: payload.data.total_pages > payload.data.page,
          loading: false,
        };
      }

      return { ...state, loading: false };

    case types.MOVIES_FETCH_MANY_FAIL:
      // Ignore responses for different search strings
      if (state.search !== payload.search) {
        return state;
      }

      return { ...state, error: payload.error, loading: false };

    default: return state;
  }
}

export default function MoviesReducer(
  state: State = initialState,
  { type, payload }: Action,
): State {
  switch (type) {
    case types.MOVIES_FETCH:
    case types.MOVIES_FETCH_SUCCESS:
    case types.MOVIES_FETCH_FAIL:
      return { ...state, movie: movieReducer(state.movie, { type, payload }) };

    case types.MOVIES_FETCH_MANY:
    case types.MOVIES_FETCH_MANY_SUCCESS:
    case types.MOVIES_FETCH_MANY_FAIL:
      return { ...state, list: listReducer(state.list, { type, payload }) };

    default: return state;
  }
}
