/* @flow */

import React from 'react';

import { mergeStyles } from '../../utils/StyleUtils';

import './LoadingPoster.scss';
import './Poster.scss';

type Props = {
  className?: string,
};

function LoadingPoster({ className }: Props) {
  const classes = mergeStyles('Poster', 'LoadingPoster', className);

  return (
    <div className={classes}>
      <div className="container" />
    </div>
  );
}

LoadingPoster.defaultProps = {
  className: undefined,
};

export default LoadingPoster;
