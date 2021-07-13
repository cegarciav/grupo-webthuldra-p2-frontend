import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import UsersRouter from './user';
import StoresRouter from './store';
import SignUp from '../components/users/signup/signUp';
import LogIn from '../components/users/login/logIn';
import HomePage from '../components/home/homePage';

function MainRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/login">
        <LogIn />
      </Route>
      <Route path="/users">
        <UsersRouter />
      </Route>
      <Route path="/stores">
        <StoresRouter />
      </Route>
    </Switch>
  );
}

export default MainRouter;
