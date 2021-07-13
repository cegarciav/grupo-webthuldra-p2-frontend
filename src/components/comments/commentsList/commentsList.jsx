import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import CommentProfileSummary from '../commentProfile/commentProfileSummary';
import ErrorsModal from '../../common/errorsModal';
import { apiGet, apiPost } from '../../../apiService';
import './commentsList.css';

function CommentsList({ storeId, reviewerId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [updatedComments, setUpdatedComments] = useState(false);

  const commentInitialValues = {
    text: '',
    grade: undefined,
  };

  const commentValidation = Yup.object({
    text: Yup.string()
      .required('Debes ingresar al menos un caracter'),
    grade: Yup.number()
      .integer('Debes ingresar una cantidad válida')
      .min(0, 'La nota no puede ser menor a 0')
      .max(5, 'La nota no puede ser mayor a 5'),
  });

  const createComment = async (values) => {
    setLoading(true);
    const newCommentResponse = await apiPost(`/stores/${storeId}/comments`, values);
    setLoading(false);
    if (newCommentResponse.data && newCommentResponse.statusCode === 201) {
      setUpdatedComments(false);
    } else if (newCommentResponse.type === 'response' && newCommentResponse.errors) {
      setErrors(newCommentResponse.errors);
    } else {
      setErrors([newCommentResponse]);
    }
  };

  useEffect(async () => {
    if (!updatedComments) {
      setLoading(true);
      let commentsResponse;
      if (storeId) {
        commentsResponse = await apiGet(`/stores/${storeId}/comments`);
      } else if (reviewerId) {
        commentsResponse = await apiGet(`/users/${reviewerId}/comments`);
      }
      setLoading(false);
      setUpdatedComments(true);
      if (commentsResponse.data && commentsResponse.statusCode === 200) {
        setComments(commentsResponse.data);
      } else if (commentsResponse.type === 'response' && commentsResponse.errors) {
        setErrors(commentsResponse.errors);
      } else {
        setErrors([commentsResponse]);
      }
    }
  }, [updatedComments]);

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
      {storeId
        ? (
          <section className="create-comment-section">
            <Formik
              initialValues={commentInitialValues}
              validationSchema={commentValidation}
              onSubmit={createComment}
            >
              {({ isValid, dirty }) => (
                <Form className="form-new-comment">
                  <section className="form-field-100">
                    <Field name="text" placeholder="Comentar..." />
                    <ErrorMessage className="form-error" name="text" component="p" />
                  </section>
                  <section className="form-field-100">
                    <Field
                      name="grade"
                      type="number"
                      placeholder="Nota"
                      min="0"
                      max="5"
                    />
                    <ErrorMessage className="form-error" name="grade" component="p" />
                  </section>
                  <button
                    type="submit"
                    disabled={!(isValid && dirty)}
                    className={!(isValid && dirty) ? 'button-disabled' : ''}
                  >
                    Enviar comentario
                  </button>
                </Form>
              )}
            </Formik>
          </section>
        ) : null}
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
