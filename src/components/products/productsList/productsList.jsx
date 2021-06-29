import React from 'react';
import PropTypes from 'prop-types';
import ProductProfileSummary from '../productProfile/productProfileSummary';
import './productsList.css';

function ProductsList({ storeId }) {
  const products = [{
    id: '4c74458e-f05a-4729-8f36-7836552eef33',
    name: 'Product 1',
    stock: 100,
    price: 500,
    unit: null,
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
  }, {
    id: '4c74458e-f05a-4729-8f36-7836552eef34',
    name: 'Product 2',
    stock: 100,
    price: 5000,
    unit: 'kg',
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
  }, {
    id: '4c74458e-f05a-4729-8f36-7836552eef33',
    name: 'Product 3',
    stock: 100,
    price: 500,
    unit: null,
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8643',
  }, {
    id: '4c74458e-f05a-4729-8f36-7836552eef34',
    name: 'Product 4',
    stock: 100,
    price: 5000,
    unit: 'kg',
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8644',
  }];

  const productComponents = products
    .filter((product) => product.storeId === storeId)
    .map((product) => (
      <li>
        <ProductProfileSummary
          key={product.id}
          id={product.id}
          name={product.name}
          stock={product.stock}
          price={product.price}
          unit={product.unit}
          image={product.image}
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
  storeId: PropTypes.string,
};

ProductsList.defaultProps = {
  storeId: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
};

export default ProductsList;
