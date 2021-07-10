import React from 'react';
import PropTypes from 'prop-types';
import './common.css';

function ErrorsModal({ errors, redirectionUrl }) {
  return (
    <main id="errors-modal">
      <div className="modal-background" />
      <article className="modal-info">
        <a href={redirectionUrl}>
          <span
            className="close-button"
          />
        </a>
        <h2>Los siguientes errores han sido detectados:</h2>
        <ul>
          {errors.map((error) => (
            <li key={error.message}>{`${error.type}: ${error.message}`}</li>
          ))}
        </ul>
      </article>
    </main>
  );
}

ErrorsModal.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  })).isRequired,
  redirectionUrl: PropTypes.string,
};

ErrorsModal.defaultProps = {
  redirectionUrl: '/',
};

export default ErrorsModal;
