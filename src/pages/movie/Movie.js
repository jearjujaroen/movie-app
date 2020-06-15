import React from 'react';
import PropTypes from 'prop-types';
import { MovieDetails } from '../../components/movie-details/MovieDetails';
import { useLocation } from 'react-router-dom';
import { useFetchMovieDetails } from '../../customHooks';

function getMovieIdFromUrl(path) {
  return path.slice(path.lastIndexOf('/') + 1);
}

export const Movie = ({ baseBackdropUrl = '', baseProfileUrl = '' }) => {
  let location = useLocation();
  const movieId = getMovieIdFromUrl(location.pathname);

  const { movie, cast } = useFetchMovieDetails(movieId);

  return (
    <MovieDetails
      cast={cast}
      movie={movie}
      movieId={movieId}
      baseBackdropUrl={baseBackdropUrl}
      baseProfileUrl={baseProfileUrl}
    />
  );
};

Movie.propTypes = {
  baseBackdropUrl: PropTypes.string.isRequired,
  baseProfileUrl: PropTypes.string.isRequired,
};
