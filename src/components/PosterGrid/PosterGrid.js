/* @flow */

import React from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';

import type { PartialMovie } from '../../types/apiTypes';
import Poster from './Poster';
import LoadingPoster from './LoadingPoster';

import './PosterGrid.scss';

type Props = {
  movies: PartialMovie[],
  loading: boolean,
  history: RouterHistory,
};

function PosterGrid({ movies, loading, history }: Props) {
  return (
    <div className="PosterGrid">
      {movies.map((movie: PartialMovie) => (
        <Poster
          key={movie.id}
          movie={movie}
          onClick={() => history.push(`/movies/${movie.id}`)}
        />
      ))}

      {loading && (
        <>
          <LoadingPoster />
          <LoadingPoster />
          <LoadingPoster />
        </>
      )}
    </div>
  );
}

export default withRouter(PosterGrid);
