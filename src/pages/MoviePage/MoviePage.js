/* @flow */

import React, { useState, useEffect, type Node } from 'react';
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

function getImageSource(path: string) {
  return `https://image.tmdb.org/t/p/original${path}`;
}

function render(content: Node) {
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
    <>
      <img className="backdrop" src={getImageSource(movie.backdrop_path)} alt={movie.title} />
      <div className="container">
        <div className="overlay">
          <p className="tagline">{movie.tagline}</p>
          <h2 className="title">{movie.title}</h2>
          <p className="overview">{movie.overview}</p>
          <p className="rate">
            <span className="start-icon" />
            {movie.vote_average}
          </p>
        </div>
      </div>
    </>
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
