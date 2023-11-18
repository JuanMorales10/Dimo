import React from 'react';
import './LoadingScreen.css';
import spinnerGif from '../../assets/1495.gif'; 
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={spinnerGif} alt="Cargando..." />
    </div>
  );
};

export default LoadingScreen;
