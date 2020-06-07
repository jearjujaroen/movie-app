import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCredits.module.css';

const CastProfiles = ({ casts, baseProfileUrl }) =>
  casts
    .filter(cast => cast.profile_path !== null)
    .map(cast => (
      <img key={cast.cast_id} src={`${baseProfileUrl}${cast.profile_path}`} />
    ));

const MovieCredits = ({ movieId, baseProfileUrl }) => {
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    const fetchMovieCredits = async () => {
      const movieCreditResp = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=123480899f7e224d408d82a90f47f3c2`
        )
      ).json();
      console.log({ movieCreditResp });
      const movieCast = movieCreditResp.cast;
      setCasts(movieCast);
    };

    fetchMovieCredits();
  }, []);

  return (
    <>
      <CastProfiles {...{ casts, baseProfileUrl }} />
    </>
  );
};

export default MovieCredits;

MovieCredits.propTypes = {
  movieId: PropTypes.string.isRequired,
  baseProfileUrl: PropTypes.string.isRequired,
};
