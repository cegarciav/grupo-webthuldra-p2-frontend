import React from 'react';
import { useParams } from 'react-router-dom';

const UserDelete = () => {
  const { userId } = useParams();
  return (
    <article>
      <h1>
        { `User ${userId}'s delete`}
      </h1>
    </article>
  );
};

export default UserDelete;
