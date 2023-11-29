import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ServiceDetail.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Carousel from 'react-multi-carousel';
import Cards from '../Cards/Cards';

function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [user, setUser] = useState(null)
  const [error, setError] = useState('');
  

  
  const fetchServiceAndUser = async () => {
    try {
      const serviceResponse = await fetch(`http://localhost:3008/service/${id}/detail`);
      if (serviceResponse.status !== 200) {
        throw new Error('Network response for service was not ok');
      }
      const serviceData = await serviceResponse.json();
      
      const userResponse = await fetch(`http://localhost:3008/user/detail/${serviceData.service.usuario_dni}`);
      if (userResponse.status !== 200) {
        throw new Error('Network response for user was not ok');
      }
      const userData = await userResponse.json();
      
     
      setService(serviceData);
      setUser(userData);
      console.log(user)
    } catch (error) {
      setError('Failed to load service or user details');
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  
  useEffect(() => {
    fetchServiceAndUser();
    }, [id]);

    
    if (error) {
        return <div>Error: {error}</div>;
  }
  
  if (!service) {
      return <div>Loading...</div>; 
    }
    
    
   return (
    <>
    <NavBar /> 
    <div className="service-detail-container">
        <div className='left-images'>
      <ServiceImages images={service.images} />
        </div>
        <div className='right-service'>
      <ServiceMeta service={service.service} user={user} />
        </div>
    </div>
      <ServiceComments comments={service.comments} />
      <Cards />
    <Footer />
    </>
  );
}

function ServiceHeader({ title }) {
    return (
      <div className="service-header">
        <h1>{title}</h1>
      </div>
    );
  }
  
  function ServiceImages({ images }) {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4 
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3 
        },
        tablet: {
          breakpoint: { max: 1024, min: 764 },
          items: 2 
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1 
        }
      };
    const backendUrl = "http://localhost:3008";
    
    return (
      <div className="service-images">
        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
        {images.map(image => (
          <img
            key={image.image_id}
            src={`${backendUrl}/img/service/${image.url}`}
            alt="Service"
            className="service-image"
          />
        ))}
        </Carousel>
      </div>
    );
  }
  
  function ServiceDescription({ description }) {
    return (
      <div className="service-description">
        <p>{description}</p>
      </div>
    );
  }
  
  function ServiceMeta({ service, user }) {

    const backendUrl = "http://localhost:3008";
    return (
      <div className="service-meta">
        <div className='service-header'>
        <ServiceHeader title={service.nombre} />
        </div>
        <div className='service-description'>
        <ServiceDescription description={service.descripcion}/>
        </div>
        <p>Precio: <b>${service.precio}</b></p>
        <p>Capacidad: {service.capacidad} personas maximo </p>
        <div className='prop-detail'>
            <img src={`${backendUrl}/img/avatar/${user.userDetails.avatar}`} />
            <p>
             {user.userDetails.nombre +' '+ user.userDetails.apellido}
            </p>
            <p>
                Telefono:  <b>{ user.userDetails.telefono}</b>
            </p>
        </div>

        <button className="reserve-button" >Reservar</button>

      </div>
    );
  }
  
  function ServiceComments({ comments }) {
    if (comments.length === 0) {
      return <div>No hay comentarios aún.</div>;
    }

  
    return (
      <div className="service-comments">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            {/* Otros detalles del comentario */}
          </div>
        ))}
      </div>
    );
        }

export default ServiceDetail;

