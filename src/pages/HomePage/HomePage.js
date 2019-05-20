/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, type RouterHistory } from 'react-router-dom';

import Page from '../../components/Page';
import Clickable from '../../components/Clickable';
import pages from '../../config/pages';
import type { PartialMovie } from '../../types/apiTypes';

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
          <Clickable key={movie.id} onClick={() => history.push(`/movies/${movie.id}`)}>
            {movie.title}
          </Clickable>
        ))}
      </div>
    </Page>
  );
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.list.data,
});

export default withRouter(connect(mapStateToProps)(HomePage));
