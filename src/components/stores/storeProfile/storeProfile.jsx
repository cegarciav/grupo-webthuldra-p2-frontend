import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfileSummary from '../../users/userProfile/userProfileSummary';
import ProductsList from '../../products/productsList/productsList';

const StoreProfile = () => {
  const { storeId } = useParams();
  const storeInfo = {
    id: storeId,
    address: 'Dirección 1',
    name: 'Una tienda 1',
    image: 'https://cdn.geekwire.com/wp-content/uploads/2020/02/amzngo1.jpeg',
    description: 'Descripción de la tienda 1',
    ownerId: 'ceeaa745-fdc1-4679-89c0-bb1a15f36f43',
  };
  const owner = {
    id: '307ff996-34aa-4fb6-90ed-ea57a74d8642',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'test@test.com',
  };
  /* const comments = [{
    id: '317ff996-34aa-4fb6-90ed-ea57a74d8642',
    text: 'Some nice comment about the store',
    grade: 5,
    reviewerId: '310ff996-34aa-4fb6-90ed-ea57a74d8642',
  }, {
    id: '327ff996-34aa-4fb6-90ed-ea57a74d8642',
    text: 'Some bad comment about the store',
    grade: 0,
    reviewerId: '311ff996-34aa-4fb6-90ed-ea57a74d8642',
  }]; */

  return (
    <main>
      <section className="store-main-info">
        <figure>
          <img src={storeInfo.image} alt={storeInfo.description} />
        </figure>
        <main>
          <h1>{storeInfo.name}</h1>
          <h4>{storeInfo.description}</h4>
        </main>
      </section>
      <hr className="section-divisor" />
      <section className="store-main-profile">
        <aside className="store-info">
          <UserProfileSummary
            id={owner.id}
            name={`${owner.firstName} ${owner.lastName}`}
            email={owner.email}
          />
        </aside>
        <section className="products-in-store">
          <ProductsList storeId={storeId} />
        </section>
      </section>
    </main>
  );
};

export default StoreProfile;
