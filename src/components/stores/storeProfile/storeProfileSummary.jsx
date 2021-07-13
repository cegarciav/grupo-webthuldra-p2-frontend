import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import './storeProfile.css';

function StoreProfileSummary({
  name,
  id,
  address,
  picture,
  description,
}) {
  return (
    <Link
      to={`/stores/${id}`}
      className="store-summary"
    >
      <article>
        <h1>{ name }</h1>
        <section>
          <img
            src={picture || '/default_store_picture.png'}
            alt={description}
          />
        </section>
        <p>{ `Dirección: ${address}` }</p>
      </article>
    </Link>
  );
}

StoreProfileSummary.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  picture: PropTypes.string,
  description: PropTypes.string.isRequired,
};

StoreProfileSummary.defaultProps = {
  picture: undefined,
};

export default StoreProfileSummary;
