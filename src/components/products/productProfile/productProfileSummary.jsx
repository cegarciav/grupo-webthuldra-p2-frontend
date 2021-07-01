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
  image,
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
            src={image}
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
  image: PropTypes.string,
  storeId: PropTypes.string.isRequired,
};

ProductProfileSummary.defaultProps = {
  unit: null,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSsfKHi3iw8M4r6es253TBy0sH_i4D9WSrt23oHNSB5eygGMStKIkKETHNxd2DGhOUHo4&usqp=CAU',
};

export default ProductProfileSummary;
