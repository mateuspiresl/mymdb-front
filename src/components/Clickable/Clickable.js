/* @flow */

import React from 'react';

import { mergeStyles } from '../../utils/StyleUtils';

import './Clickable.scss';

type Props = {
  className?: string,
  onClick: Function,
};

function Clickable({ className, onClick, ...props }: Props) {
  const classes = mergeStyles(className, 'Clickable');
  const boundOnClick = () => onClick();
  const clickProps = {
    onClick,
    onKeyPress: boundOnClick,
    role: 'button',
    tabIndex: 0,
  };

  return <div className={classes} {...clickProps} {...props} />;
}

Clickable.defaultProps = {
  className: undefined,
};

export default Clickable;
