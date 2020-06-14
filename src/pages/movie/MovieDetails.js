import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './MovieDetails.module.css';
import { MovieCredits } from './MovieCredits';

export const MovieDetails = ({ baseBackdropUrl, baseProfileUrl }) => {
  const [movie, setMovie] = useState({});
  let { movieId } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetailsResp = await (
          await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US`
          )
        ).json();
        setMovie(movieDetailsResp);
      } catch (e) {
        console.log(e);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

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
        <MovieCredits movieId={movieId} baseProfileUrl={baseProfileUrl} />
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  baseBackdropUrl: PropTypes.string.isRequired,
  baseProfileUrl: PropTypes.string.isRequired,
};
