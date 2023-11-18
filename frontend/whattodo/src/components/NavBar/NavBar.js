import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logowhat.png';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Aquí es donde verificarías el estado del usuario, por ejemplo, usando un contexto
  // const { user, logout } = useContext(UserContext);
  const user = null; // Reemplazar con la lógica de autenticación real

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
            <li className='li-nav'><Link to='/register' className="navbar-action register">Register</Link></li>
            <li className='li-nav'><Link to='/login' className="navbar-action login">Log In </Link></li>
          </ul>

        </div>
        <div className="navbar-actions">

        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="burger-menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;




