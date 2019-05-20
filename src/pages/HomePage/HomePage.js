// @flow

import React from 'react';
import { connect } from 'react-redux';

import Page from '../../components/Page';
import pages from '../../config/pages';

import './HomePage.scss';

type Movie = {
  id: number,
  title: string,
  overview: string,
  release_date: string,
  original_language: string,
  original_title: string,
  vote_count: number,
  vote_average: number,
  popularity: number,
  genre_ids: Array<number>,
  poster_path: string,
  backdrop_path: string,
  video: boolean,
  adult: boolean,
};

type Props = {
  movies: Array<Movie>
};

function HomePage({ movies }: Props) {
  return (
    <Page className="HomePage" page={pages.home}>
      <div className="grid">
        {movies.map(movie => (
          <div key={movie.id}>
            {movie.title}
          </div>
        ))}
      </div>
    </Page>
  );
}

const mapStateToProps = ({ movies }) => ({
  movies: movies.list.data,
});

export default connect(mapStateToProps)(HomePage);
