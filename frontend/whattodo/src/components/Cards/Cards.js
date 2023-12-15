import React from 'react'
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';
import './cards.css';


function Cards() {
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {

        const servicesResponse = await fetch("http://localhost:3008/service/allServices");
        if (!servicesResponse.ok) {
          throw new Error(`HTTP error! status: ${servicesResponse.status}`);
        }
        const serviceResult = await servicesResponse.json();
        
        setData(serviceResult);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchData();
  }, [])


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
    <div className='card-list'>
      <h2>Ultimas Experiencias Cargadas</h2>
      <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
      {data.map((service)=>{
        return <Card key={service.id} {...service} />
      })}
      </Carousel>
    </div>
  )
}

export default Cards