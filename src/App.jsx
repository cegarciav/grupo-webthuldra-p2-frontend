import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import UsersRouter from './routers/user';
import StoresRouter from './routers/store';
import SignUp from './components/users/signup/signUp';
import LogIn from './components/users/login/logIn';
import HomePage from './components/home/homePage';
import './App.css';

function App() {
  return (
    <div>
      <header id="main-header">
        <nav>
          <ul>
            <li id="logo">
              <a href="/">
                <img src="/webthuldra_logo.png" alt="Copo de nieve, logo de Webthuldra" />
              </a>
            </li>
            <li>
              <a href="/stores">
                Stores
              </a>
            </li>
            <li>
              <a href="/users/my-profile">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <Router>
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
      </Router>
      <footer>
        <ul>
          <li>Webthuldra &copy; 2021</li>
          <li><a href="/signup">Registrarse</a></li>
          <li><a href="/login">Iniciar sesión</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
