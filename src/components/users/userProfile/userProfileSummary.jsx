import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import './userProfile.css';

function UserProfileSummary({
  name,
  id,
  picture,
  email,
}) {
  return (
    <Link
      to={`/users/${id}`}
      className="user-summary"
    >
      <article>
        <h1>{ name }</h1>
        <section>
          <img
            src={picture || '/default_profile_picture.png'}
            alt={name}
          />
        </section>
        <p>{ `Contacto: ${email}` }</p>
      </article>
    </Link>
  );
}

UserProfileSummary.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  picture: PropTypes.string,
  email: PropTypes.string.isRequired,
};

UserProfileSummary.defaultProps = {
  picture: undefined,
};

export default UserProfileSummary;
