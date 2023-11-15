import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faIdCard, faEye, faKey, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logowhat.png'
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './NavBar.css';

function NavBar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid nav">
          <Link to="/" className="navbar-brand"><img src={logo} alt="descripción" className='logo' /></Link>
          <button className="navbar-toggler but" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbaa">
              <li className="nav-item dropdown">
                <Link to="/cuenta" className="nav-link dropdown-toggle cuenta" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cuenta
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to="/action" className="dropdown-item">Action</Link></li>
                  <li><Link to="/crea-experiencia" className="dropdown-item">Crea una Experiencia</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link to="/something-else" className="dropdown-item">Something else here</Link></li>
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
