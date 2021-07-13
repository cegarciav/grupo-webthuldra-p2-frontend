import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ErrorsModal from '../../common/errorsModal';
import { apiDelete } from '../../../apiService';
import './storeDelete.css';

function StoreDelete() {
  const { storeId } = useParams();
  const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    if (storeId) {
      setLoading(true);
      const deleteResponse = await apiDelete(`/admin/stores/${storeId}`);
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
        <h1>Eliminando tienda...</h1>
      </main>
    );
  }

  if (errors) {
    return (
      <ErrorsModal
        errors={errors}
        redirectionUrl={`/stores/${storeId}/delete`}
      />
    );
  }

  return (
    <main>
      <form onSubmit={(e) => { submitForm(e); }}>
        <p className="store-delete-warning">
          Eliminar los datos de una tienda es un proceso irreversible,
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

export default StoreDelete;
