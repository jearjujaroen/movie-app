import React from 'react';
import renderer from 'react-test-renderer';
import { Movie } from './Movie';
import { MovieDetails } from './MovieDetails';
import { MovieList } from './MovieList';
import { MovieCredits } from './MovieCredits';
import { Route, MemoryRouter } from 'react-router-dom';

const baseProfileUrl = '';

describe('Movie', () => {
  test('snapshot renders', () => {
    const baseBackdropUrl = '';

    const component = renderer.create(
      <MemoryRouter initialEntries={['/1']}>
        <Route path={`/:movieId`}>
          <Movie {...{ baseBackdropUrl, baseProfileUrl }} />
        </Route>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('MovieDetails', () => {
  test('snapshot renders', () => {
    const baseBackdropUrl = '';

    const component = renderer.create(
      <MemoryRouter initialEntries={['/1']}>
        <Route path={`/:movieId`}>
          <MovieDetails {...{ baseBackdropUrl, baseProfileUrl }} />
        </Route>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('MovieList', () => {
  test('snapshot renders', () => {
    const basePosterUrl = '';
    const movies = [];

    const component = renderer.create(
      <MovieList {...{ basePosterUrl, movies }} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('MovieCredits', () => {
  test('snapshot renders', () => {
    const movieId = '2';

    const component = renderer.create(
      <MovieCredits {...{ baseProfileUrl, movieId }} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
