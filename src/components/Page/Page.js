// @flow

import React, { type Node } from 'react';
import { useDebounce } from 'use-debounce';

import Header from '../Header';
import { mergeStyles } from '../../utils/StyleUtils';

import './Page.scss';

type Props = {
  className?: string,
  page: string,
  error?: string | null,
  children: Node,
};

function Page({
  className, page, error, children,
}: Props) {
  // Let the animation out happen
  const [debouncedError] = useDebounce(error, 1000);

  const classes = mergeStyles('Page', className);

  return (
    <div className={classes}>
      <Header page={page} />
      <div className={mergeStyles('error', { visible: error })}>
        <span className="message">{error || debouncedError}</span>
      </div>

      <div className="content">{children}</div>
    </div>
  );
}

Page.defaultProps = {
  className: undefined,
  error: undefined,
};

export default Page;
