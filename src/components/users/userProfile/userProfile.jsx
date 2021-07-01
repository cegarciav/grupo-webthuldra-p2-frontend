import React from 'react';
import {
  useParams,
} from 'react-router-dom';
import StoresList from '../../stores/storesList/storesList';
import CommentsList from '../../comments/commentsList/commentsList';
import DealsList from '../../deals/dealsList/dealsList';

const UserProfile = () => {
  const { userId } = useParams();
  let myId;
  let userInfo;
  if (userId === 'my-profile') {
    myId = '8e67c890-e293-4c8f-af99-1ea3e89ad4c5';
    userInfo = {
      id: myId,
      firstName: 'Mi Nombre',
      lastName: 'Mi Apellido',
      email: 'mi.email@test.com',
      image: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    };
  } else {
    myId = userId;
    userInfo = {
      id: userId,
      firstName: 'Nombre 1',
      lastName: 'Apellido 1',
      email: 'test1@test.com',
      image: 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg',
    };
  }

  return (
    <main>
      <section className="user-header-content">
        <figure className="profile-pic">
          <img src={userInfo.image} alt={`${userInfo.firstName} ${userInfo.lastName}`} />
          <figcaption>
            <h1>{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
            <h4>{`Contacto: ${userInfo.email}`}</h4>
          </figcaption>
        </figure>
      </section>

      <section className="user-main-profile">
        <aside className="user-info">
          <DealsList
            userId={myId}
          />
          <CommentsList
            reviewerId={myId}
          />
        </aside>
        <section className="products-in-store">
          <StoresList
            ownerId={userInfo.id}
          />
        </section>
      </section>
    </main>
  );
};

export default UserProfile;
