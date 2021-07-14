import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ErrorsModal from '../../common/errorsModal';
import { apiDelete, apiGet } from '../../../apiService';
import './productDelete.css';

function ProductDelete() {
  const { productId, storeId } = useParams();
  const [successfullyDeleted, setSuccessfullyDeleted] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);

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

  useEffect(async () => {
    setLoading(true);
    const storeResponse = await apiGet(`/stores/${storeId}`);
    setLoading(false);
    if (storeResponse.data && storeResponse.statusCode === 200) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const validUser = currentUser && (currentUser.id === storeResponse.data.ownerId);
      setIsParticipant(validUser);
    } else if (storeResponse.type === 'response' && storeResponse.errors) {
      setErrors(storeResponse.errors);
    } else {
      setErrors([storeResponse]);
    }
  }, []);

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

  if (isParticipant) {
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

  return <main />;
}

export default ProductDelete;
