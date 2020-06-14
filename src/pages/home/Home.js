import React from 'react';
import PropTypes from 'prop-types';
import { MovieList } from '../movie/MovieList';
import { Search } from '../../components/search/Search';
import styles from './Home.module.css';

export const Home = ({ header, movies, basePosterUrl, handleInputChange }) => {
  return (
    <main className={styles.mainPageContainer}>
      <Search handleInputChange={handleInputChange} />
      <h1 className={styles.header}>{header}</h1>
      <MovieList movies={movies} basePosterUrl={basePosterUrl} />
    </main>
  );
};

Home.propTypes = {
  header: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  basePosterUrl: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
