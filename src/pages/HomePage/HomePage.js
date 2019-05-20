/* @flow */

import React from 'react';
import { connect } from 'react-redux';

import Page from '../../components/Page';
import PosterGrid from '../../components/PosterGrid';
import pages from '../../config/pages';
import type { PartialMovie } from '../../types/apiTypes';

import './HomePage.scss';

type Props = {
  movies: PartialMovie[],
};

function HomePage({ movies }: Props) {
  return (
    <Page className="HomePage" page={pages.home}>
      <PosterGrid movies={movies} />
    </Page>
  );
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.list.data,
});

export default connect(mapStateToProps)(HomePage);
