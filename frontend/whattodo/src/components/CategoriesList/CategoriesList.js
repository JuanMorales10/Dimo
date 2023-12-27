import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';
import '../Cards/cards.css';

function CategoriesList() {
  const [dataByCategory, setDataByCategory] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const cardListRef = useRef(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await fetch("http://localhost:3008/service/allServices");
        if (!servicesResponse.ok) {
          throw new Error(`HTTP error! status: ${servicesResponse.status}`);
        }
        const services = await servicesResponse.json();
  
        const groupedByCategory = services.reduce((acc, service) => {
          // Usa el nombre de la categoría para agrupar, en lugar del ID
          const categoryName = service.category.nombre;
          acc[categoryName] = acc[categoryName] || [];
          acc[categoryName].push(service);
          return acc;
        }, {});
  
        setDataByCategory(groupedByCategory);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };
  
    fetchData();
  }, []);
  

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
  );
}

export default CategoriesList;