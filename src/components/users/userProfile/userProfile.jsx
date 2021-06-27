import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  return (
    <article>
      <h1>
        { `User ${userId}'s profile`}
      </h1>
    </article>
  );
};

export default UserProfile;
