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
  image,
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
            src={image}
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
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default StoreProfileSummary;
