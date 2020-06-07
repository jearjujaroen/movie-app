import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import styles from './Home.module.css';

import { MovieList } from '../movie/MovieList';

export const Home = ({ header, movies, basePosterUrl, handleInputChange }) => {
  return (
    <main className={styles.mainPageContainer}>
      <div className={styles.searchBar}>
        <form>
          <label>
            Search
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 12 13'
              width='20'
              height='21'
            >
              <g strokeWidth='2' stroke='#6c6c6c' fill='none'>
                <path d='M11.29 11.71l-4-4' />
                <circle cx='5' cy='5' r='4' />
              </g>
            </svg>
            <input name='search' onChange={e => handleInputChange(e)} />
          </label>
        </form>
      </div>
      <h1 className={styles.header}>{header}</h1>

      <Switch>
        <Route exact path='/'>
          <MovieList movies={movies} basePosterUrl={basePosterUrl} />
        </Route>
      </Switch>
    </main>
  );
};

Home.propTypes = {
  header: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  movieConfigurations: PropTypes.object.isRequired,
  basePosterUrl: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
