/* @flow */

import http from '../config/http';

type Query = {
  title?: string,
};

export async function getMovie(id: number) {
  const { data } = await http.get(`movies/${id}`);
  return data;
}

export async function getManyMovies(query?: Query = {}, page?: number = 1) {
  const { data } = await http.get('movies', {
    params: { title: query.title || undefined, page },
  });

  return data;
}
