import React from 'react';
import './AboutUs.css'; 
import imagen from '../../assets/img/justIn.jpg';
import JustInSection from '../JustInSection/JustInSection';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import DiscoverOurBests from '../DiscoverOurBest/DiscoverOurBests';

const AboutUs = () => {
  return (
    <>
    <NavBar />
    <section id="about-us" className="about-section fade-in">
        <div className="container">
          <div className="about-header">
            <h1>Sobre Nosotros</h1>
            <p>Descubre quiénes somos, qué hacemos y por qué nos apasiona brindarte las mejores experiencias.</p>
          </div>
          <div className="about-content">
            <img src={imagen} alt="Imagen representativa" className="about-image"/>
            <div className="about-details">
              <h3>Nuestra Historia</h3>
              <p>Desde nuestros humildes comienzos en el año XXXX, WhatToDo ha buscado conectar a las personas con experiencias únicas e inolvidables en el mundo de la gastronomía, la aventura y la cultura.</p>
              <p>Nuestro equipo está compuesto por apasionados expertos en viajes, cocina y aventura, comprometidos en seleccionar y ofrecer solo lo mejor para ti.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="about-bottom-section fade-in">
        <div className="container">
          <div className="about-features">
            <div className="feature">
              <h4>Calidad</h4>
              <p>Nuestras experiencias son cuidadosamente seleccionadas y evaluadas para garantizar la máxima satisfacción de nuestros clientes.</p>
            </div>
            <div className="feature">
              <h4>Soporte</h4>
              <p>Contamos con un equipo de atención al cliente listo para ayudarte en lo que necesites, antes, durante y después de tu experiencia.</p>
            </div>
            <div className="feature">
              <h4>Comunidad</h4>
              <p>Somos una gran familia de viajeros y aventureros. Únete a nuestra comunidad y comparte tus experiencias y recomendaciones.</p>
            </div>
          </div>
        </div>
      </section>
      <JustInSection /> 
      <DiscoverOurBests /> 
      <Footer />
    </>
  );
};

export default AboutUs;

