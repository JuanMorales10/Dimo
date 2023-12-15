import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import './ServiceDetail.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Carousel from 'react-multi-carousel';
import TabContainer from '../TabContainer/TabContainer';
import 'react-multi-carousel/lib/styles.css';
import Cards from '../Cards/Cards';
import './ServiceDetailTest.css'

function ServiceDetail() {
    const { id } = useParams();
    const history = useHistory();
    const { token } = useContext(UserContext);
    const [service, setService] = useState(null);
    const [error, setError] = useState('');
    const [serviceOwner, setServiceOwner] = useState(null);
    const backendUrl = "http://localhost:3008";

    const fetchService = async () => {
        try {
            const serviceResponse = await fetch(`${backendUrl}/service/${id}/detail`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (serviceResponse.status !== 200) {
                throw new Error('Network response for service was not ok');
            }
            const serviceData = await serviceResponse.json();
            setService(serviceData);

            const idUser = serviceData.service.usuario_dni;
            const ownerResponse = await fetch(`${backendUrl}/user/detailService/${idUser}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const ownerData = await ownerResponse.json();
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
        return <div>Cargando...</div>;
    }


    const handleReserveClick = () => {
        history.push(`/reserva/${service.service.id}`);
    };

    const createGoogleMapsLink = (address) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 764 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            <NavBar />
            <div className="service-detail-container">
                <Carousel responsive={responsive} infinite={true} autoPlay={true} className="service-carousel">
                    {service.images.map(image => (
                        <div key={image.image_id} className="carousel-image-container">
                            <img src={`${backendUrl}/img/service/${image.url}`} alt="Service" />
                        </div>
                    ))}
                </Carousel>
                <div className="service-detail-overlay">
                    <ServiceHeader title={service.service.nombre} rating={service.service.rating} />
                </div>
                <TabContainer
                    details={<ServiceMeta service={service.service} user={serviceOwner} handleReserveClick={handleReserveClick} createGoogleMapsLink={createGoogleMapsLink} />}
                    comments={<ServiceComments comments={service.comments} />}
                //   amenities={/* ... contenido para amenities ... */}
                //   policies={/* ... contenido para policies ... */}
                />
                <div className="service-detail-content">
                    <Cards />
                </div>
            </div>
            <Footer />
        </>
    );
}

function ServiceHeader({ title, rating }) {
    return (
        <div className="service-header">
            <h1>{title}</h1>
            <RatingStars rating={rating} />
        </div>
    );
}

function RatingStars({ rating }) {
    // Crea un arreglo con 5 elementos [0, 0, 0, 0, 0]
    const totalStars = 5;
    let stars = Array(totalStars).fill(0);

    return (
        <div className="rating">
            {stars.map((_, index) => {
                return (
                    <span key={index} className={index < rating ? "star filled" : "star"}>
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
}

function ServiceMeta({ service, user, handleReserveClick, createGoogleMapsLink }) {
    const backendUrl = "http://localhost:3008";
    return (
        <>
            <div className="service-meta">
                <ServiceDescription description={service.descripcion} />
                <p>Precio: <b>${service.precio}</b></p>
                <p>Capacidad: {service.capacidad} personas máximo</p>
                <div className='prop-detail'>
                    <img src={`${backendUrl}/img/avatar/${user.avatar}`} className='img-service-owner' />
                    <p>{user.nombre + ' ' + user.apellido}</p>
                </div>
                <a href={createGoogleMapsLink(service.direccion)} target="_blank" rel="noopener noreferrer" className="google-maps-link">
                    Ver Ubicación en Google Maps
                </a>
            </div>
            <button className="reserve-button" onClick={handleReserveClick}>Reservar</button>
        </>
    );
}

function ServiceDescription({ description }) {
    return (
        <div className="service-description">
            <p>{description}</p>
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
                </div>
            ))}
        </div>
    );
}

export default ServiceDetail;
