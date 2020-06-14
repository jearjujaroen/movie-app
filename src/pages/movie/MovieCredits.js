import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CastProfiles = ({ casts, baseProfileUrl }) =>
  casts
    .filter(cast => cast.profile_path !== null)
    .map(cast => (
      <img
        key={cast.cast_id}
        src={`${baseProfileUrl}${cast.profile_path}`}
        alt='cast'
      />
    ));

export const MovieCredits = ({ movieId, baseProfileUrl }) => {
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    //TODO: refactor fetchMovieCredits api into APIUtils
    const fetchMovieCredits = async () => {
      const movieCreditResp = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}`
        )
      ).json();
      const movieCast = movieCreditResp.cast;
      setCasts(movieCast);
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <>
      <CastProfiles {...{ casts, baseProfileUrl }} />
    </>
  );
};

MovieCredits.propTypes = {
  movieId: PropTypes.string.isRequired,
  baseProfileUrl: PropTypes.string.isRequired,
};
