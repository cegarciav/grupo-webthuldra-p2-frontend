import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import MainRouter from './routers/index';
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
                Tiendas
              </a>
            </li>
            <li>
              <a href="/users/my-profile">
                Perfil
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <Router>
        <MainRouter />
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
