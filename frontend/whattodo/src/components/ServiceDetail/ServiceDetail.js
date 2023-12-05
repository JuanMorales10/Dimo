import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import './ServiceDetail.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Carousel from 'react-multi-carousel';
import Cards from '../Cards/Cards';

function ServiceDetail() {
    const { id } = useParams();
    const { token } = useContext(UserContext);
    const [service, setService] = useState(null);
    const [error, setError] = useState('');
    const [serviceOwner, setServiceOwner] = useState(null); 


    const fetchService = async () => {
        try {
            const serviceResponse = await fetch(`http://localhost:3008/service/${id}/detail`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (serviceResponse.status !== 200) {
                throw new Error('Network response for service was not ok');
            }
            const serviceData = await serviceResponse.json();

            console.log(serviceData)
            setService(serviceData);

            const ownerResponse = await fetch(`http://localhost:3008/user/detail/${serviceData.service.usuario_dni}`, {
              headers: { 'Authorization': `Bearer ${token}` },
          });
          const ownerData = await ownerResponse.json();

          console.log(ownerData.profile)

          setServiceOwner(ownerData.profile); 
            
        } catch (error) {
            setError('Failed to load service details');
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

   

    useEffect(() => {
        fetchService();
    }, [id, token]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!service || !serviceOwner) {
      return <div>Loading...</div>;
  }

    console.log(serviceOwner)

    return (
        <>
            <NavBar />
            <div className="service-detail-container">
                <div className='left-images'>
                    <ServiceImages images={service.images} />
                </div>
                <div className='right-service'>
                    <ServiceMeta service={service.service} user={serviceOwner} />
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

  const createGoogleMapsLink = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
};

  const backendUrl = "http://localhost:3008";

  if (!user ) {
    return <div>Loading...</div>;
}

  return (
    <>
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
          <img src={`${backendUrl}/img/avatar/${user.avatar}`} />
          <p>
           {user.nombre +' '+ user.apellido}
          </p>
      </div>
      {service && (
                        <a href={createGoogleMapsLink(service.direccion)} target="_blank" rel="noopener noreferrer" className="google-maps-link">
                            Ver Ubicación en Google Maps
                        </a>
                    )}

    </div>
      <button className="reserve-button" >Reservar</button>
    </>
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
        </div>
      ))}
    </div>
  );
      }

export default ServiceDetail;
