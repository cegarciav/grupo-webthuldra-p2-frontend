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
  storeImage,
  customerId,
}) {
  return (
    <article className="comment-summary">
      <section className="user-info">
        <Link
          to={`/stores/${storeId}`}
        >
          <figure>
            <img
              src={storeImage}
              alt={storeName}
            />
          </figure>
          <p>{status}</p>
        </Link>
      </section>
      <section className="comment-text">
        <Link
          to={customerId ? `/users/${customerId}/deals/${id}` : `/stores/${storeId}/deals/${id}`}
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
  storeImage: PropTypes.string,
  customerId: PropTypes.string.isRequired,
};

DealProfileSummary.defaultProps = {
  storeImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5xmqqf3t_zKomZB_LE3K6V_HWVEOoKZohQQ&usqp=CAU',
};

export default DealProfileSummary;
