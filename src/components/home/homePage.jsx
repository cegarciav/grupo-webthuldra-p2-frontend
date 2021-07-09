import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './homePage.css';

function HomePage() {
  return (
    <main id="home-page">
      <Link
        to="/stores"
        className="main-link"
      >
        Explorar tiendas
      </Link>
      <Link
        to="/signup"
        className="main-link"
      >
        Registrarse
      </Link>
      <Link
        to="/login"
        className="main-link"
      >
        Iniciar sesión
      </Link>
    </main>
  );
}

export default HomePage;
