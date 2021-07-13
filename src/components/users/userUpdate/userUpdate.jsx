import React, { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ErrorsModal from '../../common/errorsModal';
import { apiPatch } from '../../../apiService';

function UserUpdate() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    newPassword: '',
    password: '',
  };
  const userUpdateValidation = Yup.object({
    email: Yup.string()
      .email('Formato inválido'),
    picture: Yup.string()
      .url('La imagen debe ser una URL válida'),
    password: Yup.string()
      .required('Debes ingresar tu contraseña para realizar cambios'),
  });

  const submitForm = async (values) => {
    setLoading(true);
    const userResponse = await apiPatch('/users/', values);
    setLoading(false);
    if (userResponse.type === 'response' && userResponse.errors) {
      setErrors(userResponse.errors);
    } else {
      setErrors([userResponse]);
    }
  };

  if (loading) {
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

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={userUpdateValidation}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="form-user-inputs">
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
                name="newpassword"
                placeholder="Nueva contraseña"
                type="password"
              />
              <ErrorMessage className="form-error" name="password" component="p" />
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
              <button type="submit" disabled={isSubmitting}>Actualizar información</button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default UserUpdate;
