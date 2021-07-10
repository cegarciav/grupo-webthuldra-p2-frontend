import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CommentProfileSummary from '../commentProfile/commentProfileSummary';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';
import './commentsList.css';

function CommentsList({ storeId, reviewerId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(async () => {
    setLoading(true);
    let commentsResponse;
    if (storeId) {
      commentsResponse = await apiGet(`/stores/${storeId}/comments`);
    } else if (reviewerId) {
      commentsResponse = await apiGet(`/users/${reviewerId}/comments`);
    }
    setLoading(false);
    if (commentsResponse.data && commentsResponse.statusCode === 200) {
      setComments(commentsResponse.data);
    } else if (commentsResponse.type === 'response' && commentsResponse.errors) {
      setErrors(commentsResponse.errors);
    } else {
      setErrors([commentsResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando lista de Comentarios...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  const commentComponents = comments
    .map((comment) => (
      <li key={comment.id}>
        <CommentProfileSummary
          id={comment.id}
          text={comment.text}
          grade={comment.grade}
          reviewerName={`${comment.reviewer.firstName} ${comment.reviewer.firstName}`}
          reviewerId={comment.reviewerId}
          storeId={comment.storeId}
        />
      </li>
    ));

  return (
    <main className="comments-container">
      <h4>Comentarios</h4>
      <ul className="comments-list">
        {commentComponents}
      </ul>
      {storeId ? <a role="button" href="/">Escribir un comentario</a> : null}
    </main>
  );
}

CommentsList.propTypes = {
  storeId: PropTypes.string,
  reviewerId: PropTypes.string,
};

CommentsList.defaultProps = {
  storeId: null,
  reviewerId: null,
};

export default CommentsList;
