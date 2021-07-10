import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import './productProfile.css';

function ProductProfileSummary({
  id,
  name,
  price,
  unit,
  picture,
  storeId,
}) {
  return (
    <Link
      to={`/stores/${storeId}/products/${id}`}
      className="product-summary"
    >
      <article>
        <h1>{ name }</h1>
        <section>
          <img
            src={picture || '/default_product_picture.png'}
            alt={name}
          />
        </section>
        <p>{ `Precio: $${price} ${unit || 'c/u'}` }</p>
      </article>
    </Link>
  );
}

ProductProfileSummary.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  unit: PropTypes.string,
  picture: PropTypes.string,
  storeId: PropTypes.string.isRequired,
};

ProductProfileSummary.defaultProps = {
  unit: null,
  picture: undefined,
};

export default ProductProfileSummary;
