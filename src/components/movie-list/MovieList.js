import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

export const MovieList = ({ movies = [], basePosterUrl = '' }) => {
  //TODO: refactor this into smaller components?
  return (
    <div className={styles.container}>
      {movies && movies.length > 0 ? (
        <ol className={styles.wrapper}>
          {movies.map(movie => (
            <li className={styles.box} key={movie.id}>
              {movie.poster_path && (
                <div className={styles.cardContainer}>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`${basePosterUrl}${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className={styles.descriptionText}>
                      <p>{movie.vote_average}</p>
                    </div>
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p>No results!</p>
      )}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  basePosterUrl: PropTypes.string.isRequired,
};
