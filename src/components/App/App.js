// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from '../../pages/HomePage';
import MoviePage from '../../pages/MoviePage';
import NotFoundPage from '../../pages/NotFoundPage';
import * as GenresActions from '../../actions/GenresActions';

type Props = {
  fetchGenresList: typeof GenresActions.fetchGenresList,
};

function App({ fetchGenresList }: Props) {
  // Requets start up data
  useEffect(() => {
    fetchGenresList();
  }, []);

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

const mapActionsToProps = {
  fetchGenresList: GenresActions.fetchGenresList,
};

export default connect(null, mapActionsToProps)(App);
