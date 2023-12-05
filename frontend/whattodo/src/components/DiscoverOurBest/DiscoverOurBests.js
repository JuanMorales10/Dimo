import React, { useEffect, useState } from 'react';
import './DiscoverOurBests.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';

// Configuración responsiva para el carrusel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2 // Muestra 2 items en desktop
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1 // Muestra 1 item en tablet
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1 // Muestra 1 item en móvil
  }
};

const DiscoverOurBests = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await fetch("http://localhost:3008/service/popularServices");
        if (!servicesResponse.ok) {
          throw new Error(`HTTP error! status: ${servicesResponse.status}`);
        }
        const serviceResult = await servicesResponse.json();
        setServices(serviceResult);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="discover-our-bests">
      <div className="container-best">
        <div>
        <h2>Descubre lo Mejor de Nosotros</h2>
        <p>Explora las experiencias más populares seleccionadas por nuestra comunidad</p>
        </div>
        <Carousel 
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={8000}
          removeArrowOnDeviceType={["tablet", "mobile"]} // Remueve las flechas en dispositivos tablet y móvil
        >
          {services.map(service => (
            <Card key={service.id} {...service} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default DiscoverOurBests;


