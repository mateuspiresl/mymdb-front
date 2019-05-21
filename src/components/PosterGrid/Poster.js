/* @flow */

import React from 'react';

import Clickable from '../Clickable';
import { mergeStyles } from '../../utils/StyleUtils';
import { BASE_URL } from '../../config/settings';
import type { PartialMovie } from '../../types/apiTypes';

import './Poster.scss';

type Props = {
  className?: string,
  movie: PartialMovie,
  onClick: Function,
};

function getImageSource(path: string) {
  return `${BASE_URL}/images/${path}?original=false`;
}

function Poster({ className, movie, onClick }: Props) {
  const classes = mergeStyles('Poster', className);

  return (
    <Clickable className={classes} onClick={onClick}>
      <div className="container image">
        {movie.poster_path && (
          <img src={getImageSource(movie.poster_path)} alt={movie.title} />
        )}
      </div>

      <div className={mergeStyles('container info', { always: !movie.poster_path })}>
        <h3>{movie.title}</h3>
        <span>{movie.vote_average}</span>
      </div>
    </Clickable>
  );
}

Poster.defaultProps = {
  className: undefined,
};

export default Poster;
