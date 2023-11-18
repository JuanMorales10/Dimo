import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section1">
        <h5>Whattodo</h5>
        <p>Tu plataforma de Booking Favorita!</p>
        <p>Email: whattodo@gmail.com</p>
      </div>
      <div className="footer-section2">
        {/* Contenido adicional si es necesario */}
      </div>
      <div className="footer-section">
        <p>Whattodo, Argentina</p>
        <p className="copy">Copyright © 2023 Todos los derechos reservados.</p>
        <div className="redes">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="insta">
            <FontAwesomeIcon icon={faInstagram} className="instagram" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="face">
            <FontAwesomeIcon icon={faFacebook} className="facebook" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="twi">
            <FontAwesomeIcon icon={faTwitter} className="twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

