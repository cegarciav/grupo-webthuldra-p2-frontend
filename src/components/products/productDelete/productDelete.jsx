import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDelete = () => {
  const { productId } = useParams();
  return (
    <main>
      <h1>
        { `Product ${productId}'s delete`}
      </h1>
    </main>
  );
};

export default ProductDelete;
