import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/img/logowhat.png';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../UserContext/UserContext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, user, logout } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    logout().then(() => {
      history.push('/');
    });
  };

  useEffect(()=>{
    
  },[user, token])


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
                <li className='li-nav'><Link to='/register' className="navbar-action register">Register</Link></li>
                <li className='li-nav'><Link to='/login' className="navbar-action login">Log In</Link></li>
              </>
            )}
            {user && (
              <div className="container-user">
                <div className="bottom">
                  <button onClick={handleLogout} className="logout">Log Out</button>
                </div>
                <div className="top">
                  <img src={`http://localhost:3008/img/avatar/${user.profile.avatar}`} width="35px" height="35px" alt="Avatar" />
                  <p><Link to="/user/profile">{user.profile.nombre}</Link></p>
                </div>
              </div>
            )}
          </ul>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="burger-menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;


