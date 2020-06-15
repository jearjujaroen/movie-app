import React from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';

export const Search = ({ handleInputChange }) => (
  //TODO: implement debounce or use Lodash debounce when searching
  <div className={styles.searchBar}>
    <form>
      <label htmlFor='search'></label>
      <input
        placeholder='Search'
        name='search'
        onChange={e => handleInputChange(e)}
      />
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
    </form>
  </div>
);

Search.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
};
