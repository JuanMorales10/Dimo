import React, { useState } from 'react';
import logo from '../../assets/img/logowhat.png'
import './NavBar.css';

function NavBar() {
  return (
    <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navwhat">
    <div class="container-fluid nav">
      <a class="navbar-brand" href="#"><img src={logo} alt="descripción" className='logo' /></a>
      <button class="navbar-toggler navega" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle cuenta" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cuenta
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Perfil</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Crea una Experiencia</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    </nav>
    </header>
  );
}

export default NavBar;