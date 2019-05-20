/* @flow */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import type { Match } from 'react-router-dom';

import Page from '../../components/Page';
import pages from '../../config/pages';
import * as MovieActions from '../../actions/MovieActions';
import type { Movie } from '../../types/apiTypes';

import './MoviePage.scss';

type Props = {
  movie: Movie,
  loading: boolean,
  error: string | null,
  fetchMovie: typeof MovieActions.fetchMovie,
  match: Match,
};

const strings = {
  loading: 'loading',
};

function render(content) {
  return (
    <Page className="MoviePage" page={pages.movie}>
      {content}
    </Page>
  );
}

function MoviePage({
  movie, loading, error, fetchMovie, match,
}: Props) {
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    if (!firstLoad && !movie && !loading && match.params.movieId) {
      const movieId = parseInt(match.params.movieId, 10);

      fetchMovie(movieId);
      setFirstLoad(true);
    }
  }, [movie, loading, fetchMovie, match, firstLoad]);

  if (error) {
    return render(<p>{error}</p>);
  }

  if (loading || !movie) {
    return render(<p>{strings.loading}</p>);
  }

  return render((
    <div key={movie.id}>
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
    </div>
  ));
}

const mapStateToProps = ({
  movies: { movie },
}, ownProps) => {
  const movieId = parseInt(ownProps.match.params.movieId, 10);

  return {
    movie: movie.data && movie.data.id === movieId ? movie.data : null,
    loading: movie.loading,
    error: movie.error,
  };
};

const mapActionsToProps = {
  fetchMovie: MovieActions.fetchMovie,
};

export default connect(mapStateToProps, mapActionsToProps)(MoviePage);
