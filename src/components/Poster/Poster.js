/* @flow */

import React, { type Node } from 'react';

import Clickable from '../Clickable';
import { mergeStyles } from '../../utils/StyleUtils';
import { BASE_URL } from '../../config/constants';

import './Poster.scss';

type Props = {
  className?: string,
  title?: string,
  imagePath?: ?string,
  onClick?: Function,
  children?: Node,
};

function getImageSource(path: string) {
  return `${BASE_URL}/images/${path}?original=false`;
}

function Poster({
  className, title, imagePath, onClick, children,
}: Props) {
  const classes = mergeStyles('Poster', className);

  return (
    <Clickable className={classes} onClick={onClick}>
      {imagePath && (
        <div className="container image">
          <img src={getImageSource(imagePath)} alt={title} />
        </div>
      )}

      {children}
    </Clickable>
  );
}

Poster.defaultProps = {
  className: undefined,
  title: '',
  imagePath: undefined,
  onClick: undefined,
  children: undefined,
};

export default Poster;
