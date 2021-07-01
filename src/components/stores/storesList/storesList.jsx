import React from 'react';
import PropTypes from 'prop-types';
import StoreProfileSummary from '../storeProfile/storeProfileSummary';
import './storesList.css';

function StoresList({ ownerId }) {
  const stores = [{
    id: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    address: 'Dirección 1',
    name: 'Una tienda 1',
    image: 'https://cdn.geekwire.com/wp-content/uploads/2020/02/amzngo1.jpeg',
    description: 'Descripción de la tienda 1',
    ownerId: '8e67c890-e293-4c8f-af99-1ea3e89ad4c5',
  }, {
    id: '207ff996-34aa-4fb6-90ed-ea57a74d8643',
    address: 'Dirección 2',
    name: 'Una tienda 2',
    image: 'https://cdn-prod.scalefast.com/public/assets/themes/bandai-namco-store-eu/images/new-icons/STORE-Orange.png',
    description: 'Descripción de la tienda 2',
    ownerId: 'ceeaa745-fdc1-4679-89c0-bb1a15f36f44',
  }, {
    id: '207ff996-34aa-4fb6-90ed-ea57a74d8644',
    address: 'Dirección 3',
    name: 'Una tienda 3',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5xmqqf3t_zKomZB_LE3K6V_HWVEOoKZohQQ&usqp=CAU',
    description: 'Descripción de la tienda 3',
    ownerId: 'ceeaa745-fdc1-4679-89c0-bb1a15f36f45',
  }];

  const storeComponents = stores
    .filter((store) => (ownerId ? (store.ownerId === ownerId) : true))
    .map((store) => (
      <li key={store.id}>
        <StoreProfileSummary
          id={store.id}
          name={store.name}
          address={store.address}
          description={store.description}
          image={store.image}
        />
      </li>
    ));
  return (
    <main>
      <h1>Lista de tiendas</h1>
      <ul className="stores-list">
        {storeComponents}
      </ul>
    </main>
  );
}

StoresList.propTypes = {
  ownerId: PropTypes.string,
};

StoresList.defaultProps = {
  ownerId: null,
};

export default StoresList;
