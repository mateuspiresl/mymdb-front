/* @flow */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import Page from '../../components/Page';
import PosterGrid from '../../components/PosterGrid';
import pages from '../../config/pages';
import type { PartialMovie } from '../../types/apiTypes';
import * as MovieActions from '../../actions/MovieActions';

import './HomePage.scss';

type Props = {
  search: string,
  movies: PartialMovie[],
  page: number,
  hasMore: boolean,
  loading: boolean,
  fetchMoviesList: typeof MovieActions.fetchMoviesList,
};

const MIN_POSTER_HEIGHT = 240 * 1.5;
const FETCH_BEFORE_N_POSTERS = 4;

function HomePage({
  search, movies, page, hasMore, loading, fetchMoviesList,
}: Props) {
  // Fetch more movies before the scroll to the bottom
  useEffect(() => {
    function listener() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const height = window.document.body.scrollHeight;
      const rowsLeft = (height - scrollPosition) / MIN_POSTER_HEIGHT;

      if (rowsLeft < FETCH_BEFORE_N_POSTERS && !loading) {
        fetchMoviesList(search, page + 1);
      }
    }

    if (hasMore) {
      const event = debounce(listener, 200, false);
      event();

      window.addEventListener('scroll', event);
      return () => window.removeEventListener('scroll', event);
    }

    return undefined;
  }, [search, page, hasMore, loading, fetchMoviesList]);

  return (
    <Page className="HomePage" page={pages.home}>
      <PosterGrid movies={movies} hasMore={hasMore} />
    </Page>
  );
}

const mapStateToProps = ({
  movies: { list },
}) => ({
  search: list.search,
  movies: list.data,
  page: list.page,
  hasMore: list.hasMore,
  loading: list.loading,
});

const mapActionsToProps = {
  fetchMoviesList: MovieActions.fetchMoviesList,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
