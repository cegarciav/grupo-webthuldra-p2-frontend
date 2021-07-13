import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductProfileSummary from '../productProfile/productProfileSummary';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';
import './productsList.css';

function ProductsList({ storeId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const productsResponse = await apiGet(`/stores/${storeId}/products`);
    setLoading(false);
    if (productsResponse.data && productsResponse.statusCode === 200) {
      setProducts(productsResponse.data);
    } else if (productsResponse.type === 'response' && productsResponse.errors) {
      setErrors(productsResponse.errors);
    } else {
      setErrors([productsResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando lista de productos...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  const productComponents = products
    .map((product) => (
      <li key={product.id}>
        <ProductProfileSummary
          id={product.id}
          name={product.name}
          stock={product.stock}
          price={product.price}
          unit={product.unit}
          picture={product.picture}
          storeId={storeId}
        />
      </li>
    ));
  return (
    <main>
      <h1>Lista de productos disponibles</h1>
      <ul className="products-list">
        {productComponents}
      </ul>
    </main>
  );
}

ProductsList.propTypes = {
  storeId: PropTypes.string.isRequired,
};

export default ProductsList;
