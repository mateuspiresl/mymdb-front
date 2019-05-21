/* @flow */

export type Genre = {
  id: number,
  name: string,
};

export type Company = {
  id: number,
  name: string,
  logo_path: ?string,
  origin_country: string,
};

export type Country = {
  name: string,
  iso_3166_1: string,
};

export type Language = {
  name: string,
  iso_639_1: string,
};

export type PartialMovie = {|
  id: number,
  title: string,
  overview: string,
  release_date: ?string,
  original_language: string,
  original_title: string,
  vote_count: number,
  vote_average: number,
  popularity: number,
  genre_ids: Array<number>,
  poster_path: ?string,
  backdrop_path: ?string,
  video: boolean,
  adult: boolean,
|};

export type Movie = {
  id: number,
  title: string,
  overview: string,
  release_date: string | null,
  original_language: string,
  original_title: string,
  vote_count: number,
  vote_average: number,
  popularity: number,
  poster_path: ?string,
  backdrop_path: ?string,
  video: boolean,

  imdb_id: string,
  status: string,
  genres: Genre[],
  tagline: string,
  budget: number,
  revenue: number,
  runtime: number,
  production_companies: Company[],
  production_countries: Country[],
  spoken_languages: Language[],
};
