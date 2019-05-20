/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, type RouterHistory } from 'react-router-dom';

import Page from '../../components/Page';
import pages from '../../config/pages';
import type { PartialMovie } from '../../types/apiTypes';
import Poster from './Poster';

import './HomePage.scss';

type Props = {
  movies: PartialMovie[],
  history: RouterHistory,
};

function HomePage({ movies, history }: Props) {
  return (
    <Page className="HomePage" page={pages.home}>
      <div className="grid">
        {movies.map((movie: PartialMovie) => (
          <Poster
            key={movie.id}
            movie={movie}
            onClick={() => history.push(`/movies/${movie.id}`)}
          />
        ))}
      </div>
    </Page>
  );
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.list.data,
});

export default withRouter(connect(mapStateToProps)(HomePage));
