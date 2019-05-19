/* @flow */

import http from '../config/http';

type Query = {
  title?: string,
};

export function getMovie(id: number) {
  return http.get(`movies/${id}`);
}

export function getManyMovies(query?: Query = {}) {
  return http.get('movies', {
    params: { title: query.title },
  });
}
