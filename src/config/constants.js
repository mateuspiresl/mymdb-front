/* eslint-disable import/prefer-default-export */
/* @flow */

export const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:1337'
  : 'https://mymdb-mpl.herokuapp.com';
