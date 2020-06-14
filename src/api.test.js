import { fetchMovieImageConfigs, fetchMovies } from './api';
import movieImgConfigs from './testMocks/movieImgConfigs.json';
import movies from './testMocks/movies.json';

describe('it fetches movie configurations', () => {
  test('fetches successfully', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(movieImgConfigs),
      })
    );

    fetchMovieImageConfigs().then(data => expect(data).toMatchSnapshot());
  });
});

describe('it fetches popular movies', () => {
  test('fetches successfully', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(movies),
      })
    );

    fetchMovies().then(data => expect(data).toMatchSnapshot());
  });
});
