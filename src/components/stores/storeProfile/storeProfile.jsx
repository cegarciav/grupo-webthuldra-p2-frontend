import React from 'react';
import { useParams } from 'react-router-dom';

const StoreProfile = () => {
  const { storeId } = useParams();
  return (
    <main>
      <article>
        <h1>
          { `Store ${storeId}'s profile`}
        </h1>
      </article>
    </main>
  );
};

export default StoreProfile;
