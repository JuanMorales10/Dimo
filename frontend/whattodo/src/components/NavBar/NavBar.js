import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logowhat.png';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../UserContext/UserContext';

const NavBar = () => {
  const { user, logout, token } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();

    if (location.pathname === '/') {
      // Si ya estás en la página de inicio, recarga la página
      window.location.reload();
    } else {
      // Si no, navega a la página de inicio
      navigate('/');
    }
  };

  useEffect(() => {
    // Esta función se ejecutará cada vez que el estado 'user' cambie
    if (user) {
      // Actualiza la UI con la información del usuario
    }
  }, [user, token]);


  return (
    <header>
      <nav className="nav-var">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo Whattodo" id="logo" />
          </Link>
        </div>
        <div className="lista">
          <ul className="lista-nav">
            <li className="li-nav"><Link to="/nosotros">Nosotros</Link></li>
            {!token && (
              <>
                <li className='li-nav'><Link to='/register-normal' className="navbar-action register">Register</Link></li>
                <li className='li-nav'><Link to='/login' className="navbar-action login">Log In</Link></li>
              </>
            )}
            {user && (
              <div className="container-user">
                <div class="dropdown top">
                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div>
                      <img src={`http://localhost:3008/img/avatar/${user.profile.avatar}`} width="35px" height="35px" alt="Avatar" />
                      <p><Link to="/user/profile">{user.profile.nombre}</Link></p>
                    </div>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/dashboard/service-list" className="dropdown-item">
                        <FontAwesomeIcon icon={faCog}  className="fa-icon" /> Ajustes 
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/profile" className="dropdown-item">
                        <FontAwesomeIcon icon={faUser} className="fa-icon" /> Perfil
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/reservas" className="dropdown-item">
                        <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" /> Reservas
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="logout">
                        <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" /> Log Out
                      </button>
                    </li>
                  </ul>

                </div>
              </div>
            )}
          </ul>
        </div>
        {!token && (
          <>
            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div className="offcanvas-header">
                <Link to="/">
                  <img src={logo} alt="Logo Whattodo" id="logo" className='logoSide' />
                </Link>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul >
                  <li className='li-nav'><Link to='/register-normal' className="navbar-action register">Register</Link></li>
                  <li className='li-nav'><Link to='/login' className="navbar-action login">Log In</Link></li>
                </ul>
              </div>
            </div>
          </>
        )}
        <button class="btn btn-primary burger-menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><FontAwesomeIcon icon={faBars} /></button>

        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
          <div className="offcanvas-header">
            <Link to="/">
              <img src={logo} alt="Logo Whattodo" id="logo" className='logoSide' />
            </Link>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul>
              <li>
                      <Link to="/dashboard/service-list" className="dropdown-item">
                        <FontAwesomeIcon icon={faCog}  className="fa-icon" /> Ajustes 
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/profile" className="dropdown-item">
                        <FontAwesomeIcon icon={faUser} className="fa-icon" /> Perfil
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/reservas" className="dropdown-item">
                        <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" /> Reservas
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="logout">
                        <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" /> Log Out
                      </button>
                    </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;



