import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logowhat.png';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../UserContext/UserContext';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para almacenar la info del usuario
  const { token, logout, fetchUserProfile } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (token) {
        try {
          const user = await fetchUserProfile();
          console.log(user)
          if (user) {
            setUser(user.profile);
          }
        } catch (error) {
          console.error('Error al cargar perfil de usuario:', error);
        }
      } else {
        setUser(null);
      }
    };
    loadUserProfile();
  }, [token, fetchUserProfile]);

  const handleLogout = () => {
    logout().then(() => {
        history.push('/'); 
    });
};

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
              <img src={`http://localhost:3008/img/avatar/${user.avatar}`}  width="35px" height="35px" />
              <p><Link to="/user/profile">{user.nombre}</Link></p>
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

