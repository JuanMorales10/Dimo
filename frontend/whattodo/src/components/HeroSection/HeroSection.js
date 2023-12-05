import React from 'react';
import './Hero.css'; // Asegúrate de crear un archivo Hero.css para tus estilos
import backgroundvideo from '../../assets/video.mp4'; // Reemplaza con tu imagen de fondo
import SearchBar from '../SearchBar/SearchBar';

const Hero = () => {
  const handleSearch = () => {
    // Aquí manejarías la lógica de búsqueda
    console.log('Buscar...');
  };

  return (
    <div className="hero-cont">
    <video autoPlay loop muted className="background-video">
      <source src={backgroundvideo} type="video/mp4" />
    </video>
    <div className="hero-content">
      <h1 className="hero-title">Descubre tu próxima aventura</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  </div>
  
  );
};

export default Hero;
{/* <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}> */}