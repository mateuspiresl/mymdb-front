// @flow

import React, { type Node } from 'react';

import Header from '../Header';
import { mergeStyles } from '../../utils/StyleUtils';

import './Page.scss';

type Props = {
  className?: string,
  page: string,
  children: Node,
};

function Page({ className, page, children }: Props) {
  const classes = mergeStyles('Page', className);

  return (
    <div className={classes}>
      <Header page={page} />
      <div className="content">{children}</div>
    </div>
  );
}

Page.defaultProps = {
  className: undefined,
};

export default Page;
