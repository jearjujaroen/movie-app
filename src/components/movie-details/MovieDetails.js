import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieDetails.module.css';
import { MovieCredit } from '../movie-credit/MovieCredit';

export const MovieDetails = ({
  cast = [],
  movie = {},
  movieId = null,
  baseBackdropUrl = '',
  baseProfileUrl = '',
}) => {
  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>
      <img
        className={styles.imgBackdrop}
        src={`${baseBackdropUrl}${movie.backdrop_path}`}
        alt={movie.title}
      />
      <h4>Overview:</h4>
      <div>{movie.overview}</div>
      <h4>Main Cast</h4>
      <div className={styles.movieCreditsWrapper}>
        <MovieCredit
          cast={cast}
          movieId={movieId}
          baseProfileUrl={baseProfileUrl}
        />
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  cast: PropTypes.array,
  movie: PropTypes.object.isRequired,
  movieId: PropTypes.string.isRequired,
  baseBackdropUrl: PropTypes.string.isRequired,
  baseProfileUrl: PropTypes.string.isRequired,
};
