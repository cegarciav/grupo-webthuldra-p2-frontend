import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import UsersList from '../components/users/usersList/usersList';
import UserProfile from '../components/users/userProfile/userProfile';
import UserUpdate from '../components/users/userUpdate/userUpdate';
import UserDelete from '../components/users/userDelete/userDelete';

function UsersRouter() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:userId/edit`}>
        <UserUpdate />
      </Route>
      <Route path={`${path}/:userId/delete`}>
        <UserDelete />
      </Route>
      <Route path={`${path}/:userId`}>
        <UserProfile />
      </Route>
      <Route path="/">
        <UsersList />
      </Route>
    </Switch>
  );
}

export default UsersRouter;
