import { sortMoviesByPopularity } from '../utils';

async function fetchAndJsonify(url) {
  let response = await fetch(url);

  let content;

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    content = await response.json();
    return content;
  }
}

const baseUrl = 'https://api.themoviedb.org/3';

export async function fetchMovieImageConfigs() {
  try {
    const movieImageData = await fetchAndJsonify(
      `${baseUrl}/configuration?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`
    );

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
    console.error(`Error fetching movie image configs`, e);
    return {};
  }
}

export async function fetchMovies(query, pageNumber, isSearch) {
  // base api url
  let apiUrl = baseUrl;
  let apiPopularUrl = `/movie/popular?`;
  let queryMoviesUrl = `/search/movie?query=${query}&include_adult=false&`;

  //determine whether we should make an api call for popular movies or for searched movies
  apiUrl = isSearch ? (apiUrl += queryMoviesUrl) : (apiUrl += apiPopularUrl);

  //append api_key
  apiUrl += `api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`;
  //append page number
  apiUrl += `&page=${pageNumber}`;

  let movieResults = [];
  try {
    const movieData = await fetchAndJsonify(apiUrl);

    //if returning popular movies we want to sort by popularity
    movieResults = isSearch
      ? movieData?.results
      : sortMoviesByPopularity(movieData?.results);

    //for now, we only show movies with a poster image
    movieResults = movieResults.filter(movie => movie.poster_path);
  } catch (e) {
    console.error(`Error fetching Movies`, e);
  }

  return movieResults;
}

export async function fetchMovieDetails(movieId) {
  let cast, movie;
  let apiUrl = `${baseUrl}/movie/${movieId}`;

  try {
    let movieCreditResp = fetchAndJsonify(
      `${apiUrl}/credits?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`
    );

    let movieDetailsResp = fetchAndJsonify(
      `${apiUrl}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US`
    );

    const values = await Promise.all([movieCreditResp, movieDetailsResp]);
    cast = values[0]?.cast;
    movie = values[1];
  } catch (e) {
    console.error(`Error fetching movie details`, e);
  }

  return {
    cast,
    movie,
  };
}
