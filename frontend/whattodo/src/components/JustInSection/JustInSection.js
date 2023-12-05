import React, {useEffect, useState} from 'react';
import './JustInSection.css'; 
import backgroundImage from '../../assets/img/Seri.jpg'; 
import CardSection from '../CardSection/CardSection';

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

  return (
    <section className="recien-llegados-seccion" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <div className='justIn'>
        <h2>¡Recién Llegados!</h2>
        <p>Explora nuestras experiencias más recientes</p>
        </div>
         <div className="card-container-sec">
          {data.map((service, index) => (
            <CardSection key={index} {...service} />
            ))}
          </div>
      </div>
    </section>
  );
};

export default JustInSection;
