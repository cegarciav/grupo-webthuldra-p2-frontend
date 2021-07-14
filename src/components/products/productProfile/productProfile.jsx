import React, { useEffect, useState } from 'react';
import {
  Link,
  useParams,
  Redirect,
} from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import ErrorsModal from '../../common/errorsModal';
import { apiGet, apiPost } from '../../../apiService';

const ProductProfile = () => {
  const { productId, storeId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [deal, setDeal] = useState(null);

  const purchaseValidation = Yup.object({
    amount: Yup.number()
      .required('Debes ingresar una cantidad a comprar')
      .positive('Debes ingresar una cantidad válida')
      .integer('Debes ingresar una cantidad válida')
      .max(product ? product.stock : 0, 'No hay suficiente stock'),
  });

  const submitForm = async (values) => {
    setLoading(true);
    const dealResponse = await apiPost(`/stores/${storeId}/deals`, {
      products: [{
        amount: values.amount,
        id: product.id,
      }],
    });
    setLoading(false);
    if (dealResponse.data && dealResponse.statusCode === 201) {
      setDeal(dealResponse.data);
    } else if (dealResponse.type === 'response' && dealResponse.errors) {
      setErrors(dealResponse.errors);
    } else {
      setErrors([dealResponse]);
    }
  };

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

  if (deal) {
    return <Redirect to={`/stores/${storeId}/deals/${deal.id}`} />;
  }

  if (loading) {
    return (
      <main>
        <h1>Cargando perfil de la tienda...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  if (product) {
    return (
      <main>
        <section className="return-link">
          <Link
            to={`/stores/${product.storeId}`}
          >
            <i className="material-icons">arrow_back</i>
            Ir a la tienda
          </Link>
        </section>
        <section className="product-buttons-section">
          <a
            role="button"
            href={`/stores/${storeId}/products/${productId}/edit`}
            className="edit-delete-product-button"
          >
            Editar Producto
          </a>
          <a
            role="button"
            href={`/stores/${storeId}/products/${productId}/delete`}
            className="edit-delete-product-button"
          >
            Eliminar Producto
          </a>
        </section>
        <section className="product-card">
          <figure>
            <img src={product.picture || '/default_product_picture.png'} alt={product.name} />
          </figure>
          <article className="product-info">
            <h1>{product.name}</h1>
            <h3>{`$${product.price} ${product.unit || 'c/u'}`}</h3>
            <h4>{`Disponibles: ${product.stock} ${product.unit || 'unidades'}`}</h4>
            <Formik
              initialValues={{ amount: 0 }}
              validationSchema={purchaseValidation}
              onSubmit={submitForm}
            >
              {({ isSubmitting }) => (
                <Form className="buy-products-form">
                  Cantidad a comprar
                  <Field
                    name="amount"
                    placeholder="Cantidad"
                    type="number"
                    min="0"
                  />
                  <ErrorMessage className="form-error" name="amount" component="p" />
                  <button type="submit" className="buy-product-button" disabled={isSubmitting}>
                    Crear acuerdo de compra
                  </button>
                </Form>
              )}
            </Formik>
          </article>
        </section>
      </main>
    );
  }

  return (<main />);
};

export default ProductProfile;
