/* @flow */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import type { Match } from 'react-router-dom';

import Page from '../../components/Page';
import Badge from '../../components/Badge';
import Rate from '../../components/Rate';
import Poster from '../../components/Poster';
import pages from '../../config/pages';
import * as MovieActions from '../../actions/MovieActions';
import { BASE_URL } from '../../config/constants';
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
  loading: 'Loading...',
};

function getImageSource(path: string) {
  return `${BASE_URL}/images/${path}?original=true`;
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

  if (loading || !movie || error) {
    return (
      <Page className="MoviePage" page={pages.movie} error={error}>
        {!error && (
          <p className="loading">
            {strings.loading}
          </p>
        )}
      </Page>
    );
  }

  return (
    <Page className="MoviePage" page={pages.movie} error={error}>
      <img className="backdrop" src={getImageSource(movie.backdrop_path)} alt={movie.title} />
      <div className="container">
        <div className="overlay">
          <div className="poster">
            <Poster key={movie.id} title={movie.title} imagePath={movie.poster_path} />
          </div>

          <div className="info">
            <p className="tagline">{movie.tagline}</p>
            <h2 className="title">{movie.title}</h2>
            <span className="release">{movie.release_date}</span>
            <p className="overview">{movie.overview}</p>

            <Rate rate={movie.vote_average} />

            <div className="genres">
              {movie.genres.map((genre, index) => (
                <Badge key={genre.id} highlight={index === 0}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
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
