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

function ProductUpdate() {
  const { storeId, productId } = useParams();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const productResponse = await apiGet(`/stores/${storeId}/products/${productId}`);
    setLoading(false);
    if (productResponse.data && productResponse.statusCode === 200) {
      setProduct(productResponse.data);
    } else if (productResponse.type === 'response' && productResponse.errors) {
      setErrors(productResponse.errors);
    } else {
      setErrors([productResponse]);
    }
  }, []);

  const productUpdateValidation = Yup.object({
    name: Yup.string()
      .required('Debes ingresar un nombre'),
    stock: Yup.number()
      .integer('Debes ingresar una cantidad válida')
      .positive('Debes tener al menos 1 unidad en stock')
      .required('Debes ingresar el stock disponible'),
    price: Yup.number()
      .integer('Debes ingresar un precio válido')
      .min(0, 'El precio debe ser mayor o igual a 0')
      .required('Debes ingresar un precio'),
    unit: Yup.string()
      .min(1, 'Si ingresas una unidad como kg, lt, etc'),
    picture: Yup.string()
      .url('La imagen debe ser una URL válida'),
  });

  const submitForm = async (values) => {
    if (product) {
      setLoading(true);
      const updateResponse = await apiPatch(`/stores/${storeId}/products/${productId}`, values);
      setLoading(false);
      if (updateResponse.data && updateResponse.statusCode === 200) {
        setSuccessfullyUpdated(true);
      } else if (updateResponse.type === 'response' && updateResponse.errors) {
        setErrors(updateResponse.errors);
      } else {
        setErrors([updateResponse]);
      }
    }
  };

  if (successfullyUpdated) {
    return <Redirect to={`/stores/${storeId}/products/${productId}`} />;
  }

  if (loading || !product) {
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
        redirectionUrl={`/stores/${storeId}/products/${productId}/edit`}
      />
    );
  }

  const initialValues = {
    name: product.name,
    stock: product.stock,
    price: product.price,
    unit: product.unit,
    picture: product.picture || undefined,
  };

  return (
    <main>
      <Formik
        initialValues={initialValues}
        validationSchema={productUpdateValidation}
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
              Stock disponible
              <Field
                name="stock"
                placeholder="Stock disponible"
                type="number"
                min="1"
              />
              <ErrorMessage className="form-error" name="stock" component="p" />
            </section>
            <section className="form-field-100">
              Precio
              <Field
                name="price"
                placeholder="$"
                type="number"
                min="0"
              />
              <ErrorMessage className="form-error" name="price" component="p" />
            </section>
            <section className="form-field-100">
              Unidad (kg, lt, trozo, etc)
              <Field name="unit" placeholder="Unidad" />
              <ErrorMessage className="form-error" name="unit" component="p" />
            </section>
            <section className="form-field-100">
              Url de la foto de tu tienda
              <Field name="picture" placeholder="Url de la foto del producto" />
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

export default ProductUpdate;
