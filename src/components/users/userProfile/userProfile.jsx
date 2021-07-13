import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import StoresList from '../../stores/storesList/storesList';
import CommentsList from '../../comments/commentsList/commentsList';
import DealsList from '../../deals/dealsList/dealsList';
import ErrorsModal from '../../common/errorsModal';
import { apiGet } from '../../../apiService';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(async () => {
    setLoading(true);
    const userResponse = await apiGet(`/users/${userId === 'my-profile' ? 'me' : userId}`);
    setLoading(false);
    if (userResponse.data && userResponse.statusCode === 200) {
      setUser(userResponse.data);
    } else if (userResponse.type === 'response' && userResponse.errors) {
      setErrors(userResponse.errors);
    } else {
      setErrors([userResponse]);
    }
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Cargando información de usuario...</h1>
      </main>
    );
  }
  if (errors) {
    return <ErrorsModal errors={errors} />;
  }

  if (user) {
    return (
      <main>
        <section className="user-header-content">
          <figure className="profile-pic">
            <img src={user.picture || '/default_profile_picture.png'} alt={`${user.firstName} ${user.lastName}`} />
            <figcaption>
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
              <h4>{`Contacto: ${user.email}`}</h4>
            </figcaption>
          </figure>
          <section className="user-profile-buttons">
            <a role="button" href="/users/me/edit">Editar Perfil</a>
            <a role="button" href="/users/me/delete">Eliminar Perfil</a>
          </section>
        </section>

        <section className="user-main-profile">
          { userId === 'my-profile'
            ? (
              <aside className="user-info">
                <section className="user-info-section">
                  <DealsList
                    userId="me"
                  />
                </section>
                <section className="user-info-section">
                  <CommentsList
                    reviewerId="me"
                  />
                </section>
              </aside>
            ) : null}
          <section className="stores-in-user">
            <a role="button" href="/stores/new" className="new-store-button">Crear tienda</a>
            <StoresList
              ownerId={user.id}
            />
          </section>
        </section>
      </main>
    );
  }

  return (<main />);
};

export default UserProfile;
