import React, { useState } from 'react';
import {
  Formik,
  Form,
} from 'formik';
import ErrorsModal from '../../common/errorsModal';
import { apiDelete } from '../../../apiService';

function StoreDelete() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    setLoading(true);
    const storeResponse = await apiDelete('/stores/store_id', values);
    setLoading(false);
    if (storeResponse.type === 'response' && storeResponse.errors) {
      setErrors(storeResponse.errors);
    } else {
      setErrors([storeResponse]);
    }
  };

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
        redirectionUrl="/stores/store_id/delete"
      />
    );
  }

  return (
    <main>
      <Formik
        onSubmit={submitForm}
      >
        {({ isValid, dirty }) => (
          <Form className="form-user-inputs">
            <p>
              Eliminar sus datos de tienda es una acción
              irreversible. ¿Desea continuar?
            </p>
            <section className="form-submit">
              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className={!(isValid && dirty) ? 'button-disabled' : ''}
              >
                Confirmar
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default StoreDelete;
