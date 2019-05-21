/* @flow */

import React from 'react';
import { connect } from 'react-redux';

import Poster from '../Poster';
import Badge from '../Badge';
import Rate from '../Rate';
import { mergeStyles } from '../../utils/StyleUtils';
import type { PartialMovie, Genre } from '../../types/apiTypes';

import './DetailedPoster.scss';

type Props = {
  className?: string,
  movie: PartialMovie,
  genres: Array<Genre>,
  onClick: Function,
};

function DetailedPoster({
  className, movie, onClick, genres,
}: Props) {
  const classes = mergeStyles('DetailedPoster', className);
  const genreId = movie.genre_ids.find(id => genres[id]);
  const genreName = genreId ? genres[genreId].name : null;

  return (
    <Poster
      className={classes}
      title={movie.title}
      imagePath={movie.poster_path}
      onClick={onClick}
    >
      <div className={mergeStyles('container info', { always: !movie.poster_path })}>
        <h3>{movie.title}</h3>

        <Rate rate={movie.vote_average} />

        {genreName && (
          <Badge>{genreName}</Badge>
        )}
      </div>
    </Poster>
  );
}

DetailedPoster.defaultProps = {
  className: undefined,
};

const mapStateToProps = ({ genres }) => ({
  genres: genres.map || {},
});

export default connect(mapStateToProps)(DetailedPoster);
