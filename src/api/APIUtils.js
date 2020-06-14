import { sortMoviesByPopularity } from '../utils';

export async function fetchMovieImageConfigs() {
  try {
    const movieImageData = await (
      await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`
      )
    ).json();

    const basePosterUrl =
      movieImageData.images.base_url + movieImageData.images.poster_sizes[6];
    const baseBackdropUrl =
      movieImageData.images.base_url + movieImageData.images.backdrop_sizes[2];
    const baseProfileUrl =
      movieImageData.images.base_url + movieImageData.images.profile_sizes[3];

    return {
      basePosterUrl,
      baseBackdropUrl,
      baseProfileUrl,
    };
  } catch (e) {
    console.log(`Error fetching movie image configs`, e);
    return {};
  }
}

export async function fetchMovies(query, page, isSearch) {
  // base api url
  let apiUrl = `https://api.themoviedb.org/3`;
  let apiPopularUrl = `/movie/popular?`;
  let queryMoviesUrl = `/search/movie?query=${query}&include_adult=false&`;

  apiUrl = isSearch ? (apiUrl += queryMoviesUrl) : (apiUrl += apiPopularUrl);

  //append api_key
  apiUrl += `api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`;
  //append page number
  apiUrl += `&page=${page}`;

  let movieResults = [];
  try {
    const movieData = await (await fetch(apiUrl)).json();

    movieResults = isSearch
      ? movieData.results
      : sortMoviesByPopularity(movieData.results);

    movieResults = movieResults.filter(movie => movie.poster_path);
  } catch (e) {
    console.log(e);
  }

  return movieResults;
}
