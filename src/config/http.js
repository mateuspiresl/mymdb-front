/* @flow */

import axios from 'axios';

const BASE_URL = 'http://localhost:1337';
const DEFAULT_HEADERS = { 'content-type': 'application/x-www-form-urlencoded' };

export default axios.create({
  baseUrl: BASE_URL,
  headers: DEFAULT_HEADERS,
});
