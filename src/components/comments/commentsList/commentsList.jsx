import React from 'react';
import PropTypes from 'prop-types';
import CommentProfileSummary from '../commentProfile/commentProfileSummary';
import './commentsList.css';

function CommentsList({ storeId }) {
  const comments = [{
    id: '317ff996-34aa-4fb6-90ed-ea57a74d8642',
    text: 'Some nice comment about the store but so looooooooooooooooooong',
    grade: 5,
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    reviewerId: '310ff996-34aa-4fb6-90ed-ea57a74d8642',
    reviewer: {
      id: '310ff996-34aa-4fb6-90ed-ea57a74d8642',
      firstName: 'Nombre 2',
      lastName: 'Apellido 2',
    },
  }, {
    id: '327ff996-34aa-4fb6-90ed-ea57a74d8642',
    text: 'Some bad comment about the store',
    grade: 0,
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    reviewerId: '311ff996-34aa-4fb6-90ed-ea57a74d8642',
    reviewer: {
      id: '311ff996-34aa-4fb6-90ed-ea57a74d8642',
      firstName: 'Nombre 2',
      lastName: 'Apellido 2',
    },
  }];

  const commentComponents = comments
    .filter((comment) => comment.storeId === storeId)
    .map((comment) => (
      <li key={comment.id}>
        <CommentProfileSummary
          id={comment.id}
          text={comment.text}
          grade={comment.grade}
          reviewerName={`${comment.reviewer.firstName} ${comment.reviewer.firstName}`}
          reviewerId={comment.reviewer.id}
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
    </main>
  );
}

CommentsList.propTypes = {
  storeId: PropTypes.string.isRequired,
};

export default CommentsList;
