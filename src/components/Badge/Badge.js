/* @flow */

import React, { type Node } from 'react';

import { mergeStyles } from '../../utils/StyleUtils';

import './Badge.scss';

type Props = {
  className?: string,
  children: Node,
};

function Badge({ className, children }: Props) {
  const classes = mergeStyles('Badge', className);

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

Badge.defaultProps = {
  className: undefined,
};

export default Badge;
