/* @flow */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import throttle from 'lodash/throttle';

import * as MoviesActions from '../../actions/MovieActions';
import pages from '../../config/pages';

import './Header.scss';
import { mergeStyles } from '../../utils/StyleUtils';

type Props = {
  page: string,
  currentSearch: string,
  loadedOnce: boolean,
  fetchMoviesList: typeof MoviesActions.fetchMoviesList,
  history: RouterHistory,
};

const strings = {
  appName: 'MyMDb',
};

function Header({
  page, currentSearch, loadedOnce, fetchMoviesList, history,
}: Props) {
  const [search, setSearch] = useState(currentSearch);
  const [debouncedSearch] = useDebounce(search, 300);

  const isHome = page === pages.home;

  useEffect(() => {
    if (isHome && (debouncedSearch !== currentSearch || !loadedOnce)) {
      fetchMoviesList(debouncedSearch);
    }
  }, [currentSearch, loadedOnce, fetchMoviesList, debouncedSearch, isHome]);

  return (
    <div className="Header">
      <div className="left">
        {!isHome && (
          <button
            className="back-button"
            type="button"
            onClick={() => history.goBack()}
          />
        )}

        <span className="app-name">
          {strings.appName}
        </span>
      </div>

      {isHome && (
        <div className="right">
          <button
            className={mergeStyles('clear-button', { visible: search })}
            type="button"
            onClick={throttle(() => setSearch(''), 1000)}
          />

          <span className="search-container">
            <input value={search} onChange={event => setSearch(event.target.value)} />
            <span className="search-icon" />
          </span>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({
  movies: { list },
}) => ({
  currentSearch: list.search,
  currentPage: list.page,
  loadedOnce: list.loadedOnce,
});

const mapActionsToProps = {
  fetchMoviesList: MoviesActions.fetchMoviesList,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Header));
