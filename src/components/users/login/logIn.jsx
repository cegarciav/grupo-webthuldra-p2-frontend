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

function LogIn() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .email('Formato inválido')
      .required('Debes ingresar un email para iniciar sesión'),
    password: Yup.string()
      .required('Debes ingresar tu contraseña'),
  });

  const submitForm = async (values) => {
    setLoading(true);
    const authResponse = await apiPost('/auth', values);
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
        <h1>Iniciando sesión...</h1>
      </main>
    );
  }

  if (errors) {
    return (
      <ErrorsModal
        errors={errors}
        redirectionUrl="/login"
      />
    );
  }

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={submitForm}
      >
        {({ isValid, dirty }) => (
          <Form className="form-user-inputs">
            <h1>Ingresa tus datos</h1>
            <section className="form-field-100">
              Email
              <Field name="email" placeholder="email" />
              <ErrorMessage className="form-error" name="email" component="p" />
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
                Iniciar sesión
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default LogIn;
