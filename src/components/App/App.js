// @flow

import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import MoviePage from '../../pages/MoviePage';
import NotFoundPage from '../../pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies/:movieId" component={MoviePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
