import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileSummary from '../../users/userProfile/userProfileSummary';
import ProductsList from '../../products/productsList/productsList';
import CommentsList from '../../comments/commentsList/commentsList';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';

const StoreProfile = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const storeResponse = await apiGet(`/stores/${storeId}`);
    setLoading(false);
    if (storeResponse.data && storeResponse.statusCode === 200) {
      setStore(storeResponse.data);
    } else if (storeResponse.type === 'response' && storeResponse.errors) {
      setErrors(storeResponse.errors);
    } else {
      setErrors([storeResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando perfil de la tienda...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  if (store) {
    return (
      <main>
        <section className="store-main-info">
          <figure>
            <img src={store.picture || '/default_store_picture.png'} alt={store.description} />
          </figure>
          <main>
            <h1>{store.name}</h1>
            <h4>{store.description}</h4>
          </main>
        </section>
        <hr className="section-divisor" />
        <section className="store-buttons-section">
          <a
            role="button"
            href={`/stores/${storeId}/edit`}
            className="edit-delete-store-button"
          >
            Editar Tienda
          </a>
          <a
            role="button"
            href={`/stores/${storeId}/delete`}
            className="edit-delete-store-button"
          >
            Eliminar Tienda
          </a>
        </section>
        <section className="store-main-profile">
          <aside className="store-info">
            <UserProfileSummary
              id={store.ownerId}
              name={`${store.owner.firstName} ${store.owner.lastName}`}
              email={store.owner.email}
            />
            <CommentsList
              storeId={storeId}
            />
          </aside>
          <section className="products-in-store">
            <button type="button">Añadir producto</button>
            <ProductsList storeId={storeId} />
          </section>
        </section>
      </main>
    );
  }

  return (<main />);
};

export default StoreProfile;
