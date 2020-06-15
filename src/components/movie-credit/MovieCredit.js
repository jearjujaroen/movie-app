import React from 'react';
import PropTypes from 'prop-types';

const CastProfiles = ({ cast = [], baseProfileUrl = '' }) =>
  cast.length > 0
    ? cast
        .filter(c => c.profile_path !== null)
        .map(c => (
          <img
            key={c.cast_id}
            src={`${baseProfileUrl}${c.profile_path}`}
            alt='cast'
          />
        ))
    : '';

export const MovieCredit = ({ cast = [], baseProfileUrl = '' }) => {
  return <CastProfiles cast={cast} baseProfileUrl={baseProfileUrl} />;
};

MovieCredit.propTypes = {
  cast: PropTypes.array,
  baseProfileUrl: PropTypes.string.isRequired,
};
