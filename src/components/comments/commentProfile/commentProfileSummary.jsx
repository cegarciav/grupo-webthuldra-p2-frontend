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
  reviewerImage,
}) {
  return (
    <article className="comment-summary">
      <section className="user-info">
        <Link
          to={`/users/${reviewerId}`}
        >
          <figure>
            <img
              src={reviewerImage}
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
  reviewerImage: PropTypes.string,
};

CommentProfileSummary.defaultProps = {
  grade: null,
  reviewerImage: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
};

export default CommentProfileSummary;
