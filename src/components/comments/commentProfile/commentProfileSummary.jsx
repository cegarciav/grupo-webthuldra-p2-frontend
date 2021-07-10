import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import './commentProfile.css';

function CommentProfileSummary({
  text,
  grade,
  reviewerName,
  reviewerId,
  reviewerPicture,
}) {
  return (
    <article className="comment-summary">
      <section className="user-info">
        <Link
          to={`/users/${reviewerId}`}
        >
          <figure>
            <img
              src={reviewerPicture || '/default_profile_picture.png'}
              alt={reviewerName}
            />
          </figure>
          <p>{grade ? `${grade}/5` : ''}</p>
        </Link>
      </section>
      <section className="comment-text">
        {text}
      </section>
    </article>
  );
}

CommentProfileSummary.propTypes = {
  text: PropTypes.string.isRequired,
  grade: PropTypes.number,
  reviewerName: PropTypes.string.isRequired,
  reviewerId: PropTypes.string.isRequired,
  reviewerPicture: PropTypes.string,
};

CommentProfileSummary.defaultProps = {
  grade: undefined,
  reviewerPicture: undefined,
};

export default CommentProfileSummary;
