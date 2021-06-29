import React from 'react';
import { useParams } from 'react-router-dom';

const ProductProfile = () => {
  const { productId } = useParams();
  return (
    <main>
      <h1>
        { `Product ${productId}'s profile`}
      </h1>
    </main>
  );
};

export default ProductProfile;
