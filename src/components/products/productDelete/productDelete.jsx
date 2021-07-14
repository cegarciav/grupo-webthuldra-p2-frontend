import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ErrorsModal from '../../common/errorsModal';
import { apiDelete } from '../../../apiService';
import './productDelete.css';

function ProductDelete() {
  const { productId, storeId } = useParams();
  const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    if (productId) {
      setLoading(true);
      const deleteResponse = await apiDelete(`/stores/${storeId}/products/${productId}`);
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
        <h1>Eliminando producto...</h1>
      </main>
    );
  }

  if (errors) {
    return (
      <ErrorsModal
        errors={errors}
        redirectionUrl={`/stores/${storeId}/products/${productId}/delete`}
      />
    );
  }

  return (
    <main>
      <form onSubmit={(e) => { submitForm(e); }}>
        <p className="product-delete-warning">
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

export default ProductDelete;
