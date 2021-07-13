import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ErrorsModal from '../../common/errorsModal';
import { apiPost } from '../../../apiService';

function StoreNew() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(null);
  const [successfullyCreated, setSuccessfullyCreated] = useState(false);

  const initialValues = {
    name: '',
    address: '',
    description: '',
    picture: '',
  };

  const storeValidation = Yup.object({
    name: Yup.string()
      .required('Debes ingresar un nombre'),
    address: Yup.string()
      .required('Debes ingresar una dirección'),
    description: Yup.string()
      .min(1, 'La descripción debe tener al menos un caracter'),
    picture: Yup.string()
      .url('La imagen debe ser una URL válida'),
  });

  const submitForm = async (values) => {
    setLoading(true);
    const storeResponse = await apiPost('/stores', values);
    setLoading(false);
    if (storeResponse.data && storeResponse.statusCode === 201) {
      setSuccessfullyCreated(true);
      setStore(storeResponse.data);
    } else if (storeResponse.type === 'response' && storeResponse.errors) {
      setErrors(storeResponse.errors);
    } else {
      setErrors([storeResponse]);
    }
  };

  if (successfullyCreated && store) {
    return <Redirect to={`/stores/${store.id}`} />;
  }

  if (loading) {
    return (
      <main>
        <h1>Creando tienda...</h1>
      </main>
    );
  }

  if (errors) {
    return (
      <ErrorsModal
        errors={errors}
        redirectionUrl="/stores/new"
      />
    );
  }

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={storeValidation}
        onSubmit={submitForm}
      >
        {({ isValid, dirty }) => (
          <Form className="form-user-inputs">
            <h1>Ingresa los datos de tu tienda</h1>
            <section className="form-field-100">
              Nombre
              <Field name="name" placeholder="Nombre" />
              <ErrorMessage className="form-error" name="name" component="p" />
            </section>
            <section className="form-field-100">
              Dirección
              <Field name="address" placeholder="Dirección" />
              <ErrorMessage className="form-error" name="address" component="p" />
            </section>
            <section className="form-field-100">
              Descripción
              <Field name="description" placeholder="Descripción" />
              <ErrorMessage className="form-error" name="description" component="p" />
            </section>
            <section className="form-field-100">
              Url de la foto de tu tienda
              <Field name="picture" placeholder="Descripción" />
              <ErrorMessage className="form-error" name="picture" component="p" />
            </section>
            <section className="form-submit">
              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className={!(isValid && dirty) ? 'button-disabled' : ''}
              >
                Crear tienda
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default StoreNew;
