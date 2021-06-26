import React from 'react';
import { useParams } from 'react-router-dom';

const StoreDelete = () => {
  const { storeId } = useParams();
  return (
    <main>
      <article>
        <h1>
          { `Store ${storeId}'s delete`}
        </h1>
      </article>
    </main>
  );
};

export default StoreDelete;
