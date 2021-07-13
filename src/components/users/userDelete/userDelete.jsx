import React, { useState } from 'react';
import {
  Formik,
  Form,
} from 'formik';
import ErrorsModal from '../../common/errorsModal';
import { apiDelete } from '../../../apiService';

function UserDelete() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    setLoading(true);
    const authResponse = await apiDelete('/users/', values);
    setLoading(false);
    if (authResponse.data && authResponse.statusCode === 200) {
      localStorage.setItem('apiToken', authResponse.data.accessToken);
    } else if (authResponse.type === 'response' && authResponse.errors) {
      setErrors(authResponse.errors);
    } else {
      setErrors([authResponse]);
    }
  };

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
        redirectionUrl="/users/me/delete"
      />
    );
  }

  return (
    <main>
      <Formik
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="form-user-inputs">
            <p>
              Eliminar sus datos de usuario es una acción
              irreversible. ¿Desea continuar?
            </p>
            <section className="form-submit">
              <button type="submit" disabled={isSubmitting}>Confirmar</button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default UserDelete;
