/* @flow */

import React from 'react';

import Poster from '../Poster';
import { mergeStyles } from '../../utils/StyleUtils';

import './LoadingPoster.scss';

type Props = {
  className?: string,
};

function LoadingPoster({ className }: Props) {
  const classes = mergeStyles('LoadingPoster', className);

  return (
    <Poster className={classes}>
      <div className="container" />
    </Poster>
  );
}

LoadingPoster.defaultProps = {
  className: undefined,
};

export default LoadingPoster;
