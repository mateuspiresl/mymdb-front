// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import { store } from './config/redux';
import App from './components/App';
import './stylesheets/index.scss';

function getRootElement(): Element {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found.');
  }

  return root;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  getRootElement(),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
