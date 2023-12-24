import React, {useEffect, useState} from 'react';
import './JustInSection.css'; 
import backgroundImage from '../../assets/img/justInbackk.jpg'; 
import CardSection from '../CardSection/CardSection';
import Carousel from 'react-multi-carousel';

const JustInSection = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const servicesResponse = await fetch("http://localhost:3008/service/allServices");
        if (!servicesResponse.ok) {
          throw new Error(`HTTP error! status: ${servicesResponse.status}`);
        }
        const serviceResult = await servicesResponse.json();

        console.log(serviceResult)
        
        const lastThreeServices = serviceResult.slice(-3);
        
        setData(lastThreeServices);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchData();
  }, [])

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3 // Muestra 2 items en desktop
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2 // Muestra 1 item en tablet
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1 // Muestra 1 item en móvil
    }
  };

  return (
    <section 
    className="recien-llegados-seccion fade-in" 
    style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
      <div className="container">
        <div className='justIn'>
        <h2>¡Recién Llegados!</h2>
        <p>Explora nuestras experiencias más recientes</p>
        </div>
         <div className="card-container-sec">
         <Carousel 
          responsive={responsive}
          infinite={true}
        >
          {data.map(service => (
            <CardSection key={service.id} {...service} />
          ))}
        </Carousel>
          </div>
      </div>
    </section>
  );
};

export default JustInSection;
