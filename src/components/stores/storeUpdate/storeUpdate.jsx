import React, { useState, useEffect } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import {
  useParams,
  Redirect,
} from 'react-router-dom';
import * as Yup from 'yup';
import ErrorsModal from '../../common/errorsModal';
import { apiPatch, apiGet } from '../../../apiService';

function StoreUpdate() {
  const { storeId } = useParams();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState(false);
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const storeResponse = await apiGet(`/stores/${storeId}`);
    setLoading(false);
    if (storeResponse.data && storeResponse.statusCode === 200) {
      setStore(storeResponse.data);
    } else if (storeResponse.type === 'response' && storeResponse.errors) {
      setErrors(storeResponse.errors);
    } else {
      setErrors([storeResponse]);
    }
  }, []);

  const storeUpdateValidation = Yup.object({
    name: Yup.string()
      .required('Debes ingresar un nombre válido'),
    address: Yup.string()
      .required('Debes ingresar una dirección válida'),
    picture: Yup.string()
      .url('La imagen debe ser una URL válida'),
  });

  const submitForm = async (values) => {
    if (store) {
      setLoading(true);
      const storeResponse = await apiPatch(`/stores/${storeId}`, values);
      setLoading(false);
      if (storeResponse.data && storeResponse.statusCode === 200) {
        setSuccessfullyUpdated(true);
      } else if (storeResponse.type === 'response' && storeResponse.errors) {
        setErrors(storeResponse.errors);
      } else {
        setErrors([storeResponse]);
      }
    }
  };

  if (successfullyUpdated) {
    return <Redirect to={`/stores/${storeId}`} />;
  }

  if (loading || !store) {
    return (
      <main>
        <h1>Actualizando información...</h1>
      </main>
    );
  }

  if (errors) {
    return (
      <ErrorsModal
        errors={errors}
        redirectionUrl={`/stores/${storeId}/edit`}
      />
    );
  }

  const initialValues = {
    name: store.name,
    address: store.address,
    description: store.description,
    picture: store.picture || undefined,
  };

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={storeUpdateValidation}
        onSubmit={submitForm}
      >
        {({ isValid, dirty }) => (
          <Form className="form-user-inputs">
            <h1>Ingresa los datos que quieras actualizar</h1>
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
              Url de la foto
              <Field name="picture" placeholder="Foto de tienda" />
              <ErrorMessage className="form-error" name="picture" component="p" />
            </section>
            <section className="form-submit">
              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className={!(isValid && dirty) ? 'button-disabled' : ''}
              >
                Actualizar información
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default StoreUpdate;
