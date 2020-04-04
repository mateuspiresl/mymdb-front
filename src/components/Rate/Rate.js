/* @flow */

import React from 'react';

import { mergeStyles } from '../../utils/StyleUtils';

import './Rate.scss';

type Props = {
  className?: string,
  rate: number,
};

function Rate({ className, rate }: Props) {
  const classes = mergeStyles('Rate', className);

  return (
    <div className={classes}>
      <span className="start-icon" />
      {rate}
    </div>
  );
}

Rate.defaultProps = {
  className: undefined,
};

export default Rate;
