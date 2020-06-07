import React from 'react';
import PropTypes from 'prop-types';
import { MovieDetails } from './MovieDetails';
import { Route, useRouteMatch } from 'react-router-dom';

export const Movie = ({ baseBackdropUrl, baseProfileUrl }) => {
  let { path } = useRouteMatch();
  return (
    <>
      <Route path={`${path}/:movieId`}>
        <MovieDetails
          baseBackdropUrl={baseBackdropUrl}
          baseProfileUrl={baseProfileUrl}
        />
      </Route>
    </>
  );
};

Movie.propTypes = {
  baseBackdropUrl: PropTypes.string.isRequired,
  baseProfileUrl: PropTypes.string.isRequired,
};
