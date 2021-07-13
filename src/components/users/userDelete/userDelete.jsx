import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ErrorsModal from '../../common/errorsModal';
import { apiDelete } from '../../../apiService';
import './userDelete.css';

function UserDelete() {
  const { userId } = useParams();
  const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    if (userId) {
      setLoading(true);
      const deleteResponse = await apiDelete(`/admin/users/${userId}`);
      setLoading(false);
      if (deleteResponse.statusCode === 204) {
        setSuccessfullyDeleted(true);
      } else if (deleteResponse.type === 'response' && deleteResponse.errors) {
        setErrors(deleteResponse.errors);
      } else {
        setErrors([deleteResponse]);
      }
    }
  };

  if (successfullyDeleted) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return (
      <main>
        <h1>Eliminando usuario...</h1>
      </main>
    );
  }

  if (errors) {
    return (
      <ErrorsModal
        errors={errors}
      />
    );
  }

  return (
    <main>
      <form onSubmit={(e) => { submitForm(e); }}>
        <p className="user-delete-warning">
          Eliminar los datos de un usuario es un proceso irreversible,
          ¿desea continuar?
        </p>
        <section className="form-submit">
          <button type="submit">
            Confirmar
          </button>
        </section>
      </form>
    </main>
  );
}

export default UserDelete;
