/* eslint-disable import/prefer-default-export */
/* @flow */

import http from '../config/http';

export async function getManyGenres() {
  const { data } = await http.get('genres');
  return data.results;
}
