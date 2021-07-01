import React from 'react';
import { useParams } from 'react-router-dom';

const ProductUpdate = () => {
  const { productId } = useParams();
  return (
    <main>
      <h1>
        { `Product ${productId}'s update`}
      </h1>
    </main>
  );
};

export default ProductUpdate;
