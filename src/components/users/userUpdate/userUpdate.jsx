import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ErrorsModal from '../../common/errorsModal';
import { apiPatch, apiGet } from '../../../apiService';
import './userUpdate.css';

function UserUpdate() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const userResponse = await apiGet('/users/me');
    setLoading(false);
    if (userResponse.data && userResponse.statusCode === 200) {
      setUser(userResponse.data);
    } else if (userResponse.type === 'response' && userResponse.errors) {
      setErrors(userResponse.errors);
    } else {
      setErrors([userResponse]);
    }
  }, []);

  const userUpdateValidation = Yup.object({
    firstName: Yup.string()
      .required('Debes ingresar un nombre válido'),
    lastName: Yup.string()
      .required('Debes ingresar un apellido válido'),
    email: Yup.string()
      .email('Formato inválido')
      .required('Debes tener un email de contacto asociado a tu cuenta'),
    picture: Yup.string()
      .url('La imagen debe ser una URL válida'),
    newPassword: Yup.string()
      .min(1, 'Tu nueva contraseña debe tener al menos 1 caracter'),
    password: Yup.string()
      .required('Debes ingresar tu contraseña para realizar cambios'),
  });

  const submitForm = async (values) => {
    if (user) {
      setLoading(true);
      const userResponse = await apiPatch(`/users/${user.id}`, values);
      setLoading(false);
      if (userResponse.data && userResponse.statusCode === 200) {
        setSuccessfullyUpdated(true);
      } else if (userResponse.type === 'response' && userResponse.errors) {
        setErrors(userResponse.errors);
      } else {
        setErrors([userResponse]);
      }
    }
  };

  if (successfullyUpdated) {
    return <Redirect to="users/me" />;
  }

  if (loading || !user) {
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
        redirectionUrl="/users/me/edit"
      />
    );
  }

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    picture: user.picture || undefined,
    newPassword: '',
    password: '',
  };

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={userUpdateValidation}
        onSubmit={submitForm}
      >
        {({ isValid, dirty }) => (
          <Form className="form-user-inputs form-user-update">
            <h1>Ingresa los datos que quieras actualizar y tu contraseña</h1>
            <fieldset className="form-user-name">
              <section>
                Nombre
                <Field name="firstName" placeholder="Nombre" />
                <ErrorMessage className="form-error" name="firstName" component="p" />
              </section>
              <section>
                Apellido
                <Field name="lastName" placeholder="Apellido" />
                <ErrorMessage className="form-error" name="lastName" component="p" />
              </section>
            </fieldset>
            <section className="form-field-100">
              Email
              <Field name="email" placeholder="email" />
              <ErrorMessage className="form-error" name="email" component="p" />
            </section>
            <section className="form-field-100">
              Url de tu foto
              <Field name="picture" placeholder="Foto de perfil" />
              <ErrorMessage className="form-error" name="picture" component="p" />
            </section>
            <section className="form-field-100">
              Nueva Contraseña
              <Field
                name="newPassword"
                placeholder="Nueva contraseña"
                type="password"
              />
              <ErrorMessage className="form-error" name="newPassword" component="p" />
            </section>
            <section className="form-field-100">
              Contraseña
              <Field
                name="password"
                placeholder="Contraseña"
                type="password"
              />
              <ErrorMessage className="form-error" name="password" component="p" />
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

export default UserUpdate;
