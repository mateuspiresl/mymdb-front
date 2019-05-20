/* @flow */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, type History } from 'react-router-dom';

import * as MoviesActions from '../../actions/MovieActions';
import pages from '../../config/pages';

import './Header.scss';

type Props = {
  page: string,
  fetchMoviesList: typeof MoviesActions.fetchMoviesList,
  history: History,
};

const strings = {
  appName: 'MyMDb',
};

function Header({ page, fetchMoviesList, history }: Props) {
  const [search, setSearch] = useState('');

  const isHome = page === pages.home;

  useEffect(() => {
    if (isHome) {
      fetchMoviesList(search);
    }
  }, [isHome, fetchMoviesList, search]);

  return (
    <div className="Header">
      <div className="left">
        {!isHome && (
          <button type="button" onClick={() => history.pop()}>
            {'<-'}
          </button>
        )}

        <span>
          {strings.appName}
        </span>
      </div>

      {isHome && (
        <div className="center">
          <input onChange={event => setSearch(event.target.value)} />
        </div>
      )}
    </div>
  );
}

const mapActionsToProps = {
  fetchMoviesList: MoviesActions.fetchMoviesList,
};

export default withRouter(connect(null, mapActionsToProps)(Header));
