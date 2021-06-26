import React from 'react';
import { useParams } from 'react-router-dom';

const UserUpdate = () => {
  const { userId } = useParams();
  return (
    <article>
      <h1>
        { `User ${userId}'s update`}
      </h1>
    </article>
  );
};

export default UserUpdate;
