import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div class="footer-dark">
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-3 item">
              <h3>Services</h3>
              <ul>
                <li><a href="#">Noche</a></li>
                <li><a href="#">Vitivinicola</a></li>
                <li><a href="#">Gastronomia</a></li>
                <li><a href="#">Aventura</a></li>
                <li><a href="#">Transporte</a></li>
              </ul>
            </div>
            <div class="col-sm-6 col-md-3 item">
              <h3>Sobre</h3>
              <ul>
              <li><a href="#">Soporte</a></li>
                <li><a href="#">Booking</a></li>
                <li><a href="#">Nosotros</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div class="col-md-6 item text">
              <h3>Dimo</h3>
              <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
            </div>
            <div className="col item social">
              <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
};

export default Footer;


