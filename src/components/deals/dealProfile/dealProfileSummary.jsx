import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import './dealProfile.css';

function DealProfileSummary({
  id,
  status,
  storeName,
  storeId,
  storePicture,
}) {
  return (
    <article className="comment-summary">
      <section className="user-info">
        <Link
          to={`/stores/${storeId}`}
        >
          <figure>
            <img
              src={storePicture || '/default_store_picture.png'}
              alt={storeName}
            />
          </figure>
          <p>{status}</p>
        </Link>
      </section>
      <section className="comment-text">
        <Link
          to={`/stores/${storeId}/deals/${id}`}
        >
          {storeName}
        </Link>
      </section>
    </article>
  );
}

DealProfileSummary.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
  storePicture: PropTypes.string,
};

DealProfileSummary.defaultProps = {
  storePicture: undefined,
};

export default DealProfileSummary;
