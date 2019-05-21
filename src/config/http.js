/* @flow */

import axios from 'axios';

import { BASE_URL } from './constants';

const DEFAULT_HEADERS = { 'content-type': 'application/x-www-form-urlencoded' };

export default axios.create({
  baseURL: BASE_URL,
  headers: DEFAULT_HEADERS,
});
