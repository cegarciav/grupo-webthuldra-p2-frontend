import React from 'react';
import { useParams } from 'react-router-dom';

const StoreUpdate = () => {
  const { storeId } = useParams();
  return (
    <main>
      <article>
        <h1>
          { `Store ${storeId}'s update`}
        </h1>
      </article>
    </main>
  );
};

export default StoreUpdate;
