import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Card from '../../../components/Card/Card';
import './ServiceListView.css'; // Asegúrate de tener un CSS adecuado para este componente

const ServiceListView = () => {
  const location = useLocation();
  let { services } = location.state || { services: [] };
  services = services.services


  return (
    <>
      <NavBar />
      <div className="service-list-container">
        <div className='title-cont'>
        <h1 className='result-title'>Resultados de la Búsqueda</h1>
        <p>
            <span>{services.length} Experiencias encontradas</span>
        </p>
        </div>
        <div className="services-flex">
          {services.length > 0 ? (
            services.map((service) => (
              <div className="card-fade-in">
                <Card key={service.id} {...service} />
              </div>
            ))
          ) : (
            <p>No se encontraron servicios que coincidan con los criterios de búsqueda.</p>
          )}
        </div>
      </div>
      <div className='fut'>
      <Footer />
      </div>
    </>
  );
};

export default ServiceListView;
