import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StoreProfileSummary from '../storeProfile/storeProfileSummary';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';
import './storesList.css';

function StoresList({ ownerId }) {
  const [stores, setStores] = useState([]);
  const [storeFilter, setStoreFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const filterFunction = (store) => {
    if (storeFilter) {
      const regexValue = new RegExp(storeFilter, 'i');
      return store.address.match(regexValue)
        || store.name.match(regexValue)
        || store.description.match(regexValue);
    }
    return true;
  };

  useEffect(async () => {
    setLoading(true);
    const storesResponse = await apiGet('/stores', ownerId ? { ownerId } : {});
    setLoading(false);
    if (storesResponse.data && storesResponse.statusCode === 200) {
      setStores(storesResponse.data);
    } else if (storesResponse.type === 'response' && storesResponse.errors) {
      setErrors(storesResponse.errors);
    } else {
      setErrors([storesResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando lista de tiendas...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  const storeComponents = stores
    .filter(filterFunction)
    .map((store) => (
      <li key={store.id}>
        <StoreProfileSummary
          id={store.id}
          name={store.name}
          address={store.address}
          description={store.description}
          picture={store.picture}
        />
      </li>
    ));

  return (
    <main>
      <h1>Lista de tiendas</h1>
      <section className="searchbar-container">
        <input
          type="text"
          className="main-searchbar"
          placeholder="Buscar tiendas"
          value={storeFilter}
          onChange={(e) => { setStoreFilter(e.target.value); }}
        />
      </section>
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
  ownerId: undefined,
};

export default StoresList;
