/* @flow */

import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../Clickable';
import Badge from '../Badge';
import { mergeStyles } from '../../utils/StyleUtils';
import { BASE_URL } from '../../config/constants';
import type { PartialMovie, Genre } from '../../types/apiTypes';

import './Poster.scss';

type Props = {
  className?: string,
  movie: PartialMovie,
  onClick: Function,
  genres: Array<Genre>,
};

function getImageSource(path: string) {
  return `${BASE_URL}/images/${path}?original=false`;
}

function Poster({
  className, movie, onClick, genres,
}: Props) {
  const classes = mergeStyles('Poster', className);
  const genreId = movie.genre_ids.find(id => genres[id]);
  const genreName = genreId ? genres[genreId].name : null;

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

        {genreName && (
          <Badge>{genreName}</Badge>
        )}
      </div>
    </Clickable>
  );
}

Poster.defaultProps = {
  className: undefined,
};

const mapStateToProps = ({ genres }) => ({
  genres: genres.map || {},
});

export default connect(mapStateToProps)(Poster);
