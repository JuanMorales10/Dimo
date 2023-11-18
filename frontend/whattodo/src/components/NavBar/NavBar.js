import React, { useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logowhat.png';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../UserContext/UserContext';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);

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
            {!user && (
              <>
                <li className='li-nav'><Link to='/register' className="navbar-action register">Register</Link></li>
                <li className='li-nav'><Link to='/login' className="navbar-action login">Log In</Link></li>
              </>
            )}
          </ul>
        </div>
        {user && (
          <div className="container-user">
            <div className="top">
              <img src={user.avatar} alt="" width="35px" height="35px" />
              <p><Link to="/profile">{user.username}</Link></p>
            </div>
            <div className="bottom">
              <button onClick={logout} className="logout">Log Out</button>
            </div>
          </div>
        )}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="burger-menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;




