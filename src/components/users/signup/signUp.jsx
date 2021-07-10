import React, { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ErrorsModal from '../../common/errorsModal';
import { apiPost } from '../../../apiService';
import './signUp.css';

function SignUp() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    password: '',
    confirmPassword: '',
  };
  const loginValidation = Yup.object({
    firstName: Yup.string()
      .required('Debes ingresar un nombre'),
    lastName: Yup.string()
      .required('Debes ingresar un apellido'),
    email: Yup.string()
      .email('Formato inválido')
      .required('Debes ingresar un email para crear una cuenta'),
    picture: Yup.string()
      .url('La imagen debe ser una URL válida'),
    password: Yup.string()
      .required('Debes ingresar tu contraseña'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas ingresadas deben ser iguales')
      .required('Debes confirmar tu contraseña'),
  });
  const submitForm = async (values) => {
    setLoading(true);
    const registerResponse = await apiPost('/users', values);
    setLoading(false);
    if (registerResponse.data && registerResponse.statusCode === 201) {
      const authResponse = await apiPost('/auth', {
        email: values.email,
        password: values.password,
      });
      if (authResponse.data && authResponse.statusCode === 200) {
        localStorage.setItem('apiToken', authResponse.data.accessToken);
      } else if (authResponse.type === 'response' && authResponse.errors) {
        setErrors(authResponse.errors);
      } else {
        setErrors([authResponse]);
      }
    } else if (registerResponse.type === 'response' && registerResponse.errors) {
      setErrors(registerResponse.errors);
    } else {
      setErrors([registerResponse]);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Enviando datos de registro...</h1>
      </main>
    );
  }

  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="form-user-inputs">
            <h1>Regístrate</h1>
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
              Contraseña
              <Field
                name="password"
                placeholder="Contraseña"
                type="password"
              />
              <ErrorMessage className="form-error" name="password" component="p" />
            </section>
            <section className="form-field-100">
              Confirma tu contraseña
              <Field
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                type="password"
              />
              <ErrorMessage className="form-error" name="confirmPassword" component="p" />
            </section>
            <section className="form-submit">
              <button type="submit" disabled={isSubmitting}>Crear cuenta</button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default SignUp;
