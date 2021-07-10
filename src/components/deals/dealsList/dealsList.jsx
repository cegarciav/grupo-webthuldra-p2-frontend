import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DealProfileSummary from '../dealProfile/dealProfileSummary';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';
import './dealsList.css';

function DealsList({ storeId, userId }) {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(async () => {
    setLoading(true);
    let dealsResponse;
    if (storeId) {
      dealsResponse = await apiGet(`/stores/${storeId}/deals`);
    } else if (userId) {
      dealsResponse = await apiGet(`/users/${userId}/deals`);
    }
    setLoading(false);
    if (dealsResponse.data && dealsResponse.statusCode === 200) {
      setDeals(dealsResponse.data);
    } else if (dealsResponse.type === 'response' && dealsResponse.errors) {
      setErrors(dealsResponse.errors);
    } else {
      setErrors([dealsResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando lista de acuerdos de compra...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  const dealComponents = deals
    .map((deal) => (
      <li key={deal.id}>
        <DealProfileSummary
          id={deal.id}
          status={deal.status}
          storeName={deal.store.name}
          storeId={deal.storeId}
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
  storeId: undefined,
  userId: undefined,
};

export default DealsList;
