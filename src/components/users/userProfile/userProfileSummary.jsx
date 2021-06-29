import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import './userProfile.css';

function UserProfileSummary({
  name,
  id,
  image,
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
            src={image}
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
  image: PropTypes.string,
  email: PropTypes.string.isRequired,
};

UserProfileSummary.defaultProps = {
  image: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
};

export default UserProfileSummary;
