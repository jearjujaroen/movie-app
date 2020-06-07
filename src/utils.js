export const sortMoviesByPopularity = movies =>
  movies.sort((a, b) => b.popularity - a.popularity);
