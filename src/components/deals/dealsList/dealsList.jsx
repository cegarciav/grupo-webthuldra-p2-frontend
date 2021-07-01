import React from 'react';
import PropTypes from 'prop-types';
import DealProfileSummary from '../dealProfile/dealProfileSummary';
import './dealsList.css';

function DealsList({ storeId, userId }) {
  const deals = [{
    id: '317ff996-34aa-4fb6-90ed-ea57a74d8642',
    status: 'abierto',
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    customerId: '8e67c890-e293-4c8f-af99-1ea3e89ad4c5',
    store: {
      id: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
      address: 'Dirección 1',
      name: 'Una tienda 1',
      image: 'https://cdn.geekwire.com/wp-content/uploads/2020/02/amzngo1.jpeg',
      description: 'Descripción de la tienda 1',
      ownerId: 'ceeaa745-fdc1-4679-89c0-bb1a15f36f43',
    },
  }, {
    id: '0bc54f87-6d67-41a2-a77d-16c629e6155e',
    status: 'completado',
    storeId: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
    customerId: '8e67c890-e293-4c8f-af99-1ea3e89ad4c5',
    store: {
      id: '207ff996-34aa-4fb6-90ed-ea57a74d8642',
      address: 'Dirección 1',
      name: 'Una tienda 1',
      image: 'https://cdn.geekwire.com/wp-content/uploads/2020/02/amzngo1.jpeg',
      description: 'Descripción de la tienda 1',
      ownerId: 'ceeaa745-fdc1-4679-89c0-bb1a15f36f43',
    },
  }];

  const dealComponents = deals
    .filter((deal) => (storeId ? (deal.storeId === storeId) : true))
    .filter((deal) => (userId ? (deal.customerId === userId) : true))
    .map((deal) => (
      <li key={deal.id}>
        <DealProfileSummary
          id={deal.id}
          status={deal.status}
          storeName={deal.store.name}
          storeId={deal.storeId}
          customerId={userId ? deal.customerId : null}
        />
      </li>
    ));
  return (
    <main className="deals-container">
      <h4>Deals</h4>
      <ul className="deals-list">
        {dealComponents}
      </ul>
    </main>
  );
}

DealsList.propTypes = {
  storeId: PropTypes.string,
  userId: PropTypes.string,
};

DealsList.defaultProps = {
  storeId: null,
  userId: null,
};

export default DealsList;
