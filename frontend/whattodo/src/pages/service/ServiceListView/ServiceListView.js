import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import { useLocation } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import Card from '../../../components/Card/Card';
import './ServiceListView.css';

const ServiceListView = () => {
  const location = useLocation();
  const [dataByCategory, setDataByCategory] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const cardListRef = useRef(null);

  // Asegúrate de que services es un array antes de usar reduce
  const servicesArray = location.state?.services?.services || [];
  const orderOfCategories = ["Vitivinícola", "Gastronomía", "Aventura", "Vida Nocturna", "Transporte"];
  
  useEffect(() => {
    if (Array.isArray(servicesArray)) {
      const groupedByCategory = servicesArray.reduce((acc, service) => {
        const categoryName = service.category.nombre;
        acc[categoryName] = acc[categoryName] || [];
        acc[categoryName].push(service);
        return acc;
      }, {});

      // Reorganizar categorías según el orden deseado
      const orderedCategories = {};
      orderOfCategories.forEach(category => {
        if (groupedByCategory[category]) {
          orderedCategories[category] = groupedByCategory[category];
        }
      });

      setDataByCategory(orderedCategories);
    }
  }, [servicesArray]);


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8 // Aumenta el número de tarjetas en pantallas grandes
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5 // Aumenta el número de tarjetas en pantallas de escritorio
    },
    superLargeTablet: {
      breakpoint: { max: 1200, min: 1024 },
      items: 4 // Aumenta el número de tarjetas en pantallas grandes
    },
    tablet: {
      breakpoint: { max: 1024, min: 764 },
      items: 3 // Aumenta el número de tarjetas en tabletas
    },
    supermobile: {
      breakpoint: { max: 764, min: 464 },
      items: 2 // Aumenta el número de tarjetas en pantallas grandes
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1 // Puedes mantener 2 o ajustarlo según el espacio disponible
    }
  };


  return (
    <>
      <NavBar />
      <div className="service-list-view">
      <div className='title-cont'>
          <h1 className='result-title'>Resultados de la Búsqueda</h1>
          <p>
            <span>{servicesArray.length} Experiencias encontradas</span>
        </p>
        </div>
      <div className={`card-list ${isVisible ? 'fade-in' : ''}`} ref={cardListRef}>
      {Object.entries(dataByCategory).map(([categoriaId, services]) => (
        <div key={categoriaId}>
          <h2>{`${categoriaId}`}</h2> 
          <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
            {services.map(service => <Card key={service.id} {...service} />)}
          </Carousel>
        </div>
      ))}
    </div>
    </div>
      <Footer />
    </>
  );
};

export default ServiceListView;
