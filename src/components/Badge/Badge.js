/* @flow */

import React, { type Node } from 'react';

import { mergeStyles } from '../../utils/StyleUtils';

import './Badge.scss';

type Props = {
  className?: string,
  highlight?: boolean,
  children: Node,
};

function Badge({ className, highlight, children }: Props) {
  const classes = mergeStyles('Badge', { highlight }, className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Badge.defaultProps = {
  className: undefined,
  highlight: false,
};

export default Badge;
