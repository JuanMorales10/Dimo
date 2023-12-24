import React, { useEffect, useState } from 'react';
import './DiscoverOurBests.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1 
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
        <div className='te-left'>
        <h2>Descubre lo Mejor de Nosotros</h2>
        <p>En nuestro sitio web, creemos en el poder de las experiencias únicas para inspirar y enriquecer vidas. Es por eso que hemos seleccionado cuidadosamente una variedad de los tours por viñedos más emocionantes, recetas de pasta deliciosas y emocionantes aventuras de senderismo en la montaña. Ya seas amante del vino, entusiasta de la comida o aventurero al aire libre, tenemos algo para ti.</p>
        </div>
        <div className='te-right'>
        <Carousel className='carrusel'
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={8000}
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


