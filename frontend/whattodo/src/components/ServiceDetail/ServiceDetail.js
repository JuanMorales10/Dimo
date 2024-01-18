import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Carousel from 'react-multi-carousel';
import TabContainer from '../TabContainer/TabContainer';
import 'react-multi-carousel/lib/styles.css';
import Cards from '../Cards/Cards';
import './ServiceDetailTest.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function ServiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const [service, setService] = useState(null);
    const [error, setError] = useState('');
    const [serviceOwner, setServiceOwner] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const backendUrl = "http://localhost:3008";
    const [hasUserReserved, setHasUserReserved] = useState(false);
    const { user } = useContext(UserContext);


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

            // Asegúrate de que serviceData.service exista antes de usarlo
            if (serviceData.service) {
                const idUser = serviceData.service.usuario_dni;
                const ownerResponse = await fetch(`${backendUrl}/user/detailService/${idUser}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                // Asegúrate de que la respuesta de ownerResponse sea válida
                if (ownerResponse.ok) {
                    const ownerData = await ownerResponse.json();
                    setServiceOwner(ownerData.profile);
                } else {
                    // Manejar el caso donde ownerResponse no es válido
                    console.error('Error fetching service owner details');
                }
            } else {
                // Manejar el caso donde serviceData.service no está disponible
                console.error('Service data is not available');
            }
        } catch (error) {
            setError('Failed to load service details');
            console.error('There has been a problem with your fetch operation:', error);
        } finally {
            setIsLoading(false); // Esto asegura que se actualice el estado de carga independientemente del resultado
        }
    };
    const checkIfUserHasReserved = async () => {
        try {
            const response = await fetch(`${backendUrl}/reserva/reserva/check?serviceId=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Si es necesario
                }
            });
            const data = await response.json();
            console.log(data)
            setHasUserReserved(data.hasReserved);
        } catch (error) {
            console.error('Error al verificar la reserva:', error);
        }
    };

    useEffect(() => {
        fetchService();
    }, [id, token]);

    useEffect(() => {
        if (user) {
            checkIfUserHasReserved();
        }
    }, [user, id, token]);

    if (isLoading || !service || !serviceOwner) {
        return <LoadingScreen />;
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleReserveClick = () => {
        navigate(`/reserva/${service.service.id}`);
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
            {isLoading ? (
                <LoadingScreen />
            ) : (
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
                            details={serviceOwner && <ServiceDescription service={service.service} user={serviceOwner} />}
                            comments={serviceOwner && <ServiceComments comments={service.comments} token={token} user={serviceOwner} hasUserReserved={hasUserReserved} service={service.service} />}
                            reservar={<ServiceMeta service={service.service} handleReserveClick={handleReserveClick} createGoogleMapsLink={createGoogleMapsLink} hasUserReserved={hasUserReserved} />}
                        //   policies={/* ... contenido para policies ... */}
                        />
                        <div className="service-detail-content">
                            <Cards />
                        </div>
                    </div>
                    <Footer />
                </>
            )}
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
    const totalStars = 5;

    return (
        <div className="rating">
            {[...Array(totalStars)].reverse().map((_, index) => {
                // Calcula el valor correcto para cada estrella
                const starNumber = totalStars - index;
                return (
                    <span key={index} className={starNumber <= rating ? "star filled" : "star"}>
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
}

function ServiceMeta({ service, handleReserveClick, createGoogleMapsLink, hasUserReserved }) {
    console.log(hasUserReserved)

    const formatDuration = (duration) => {
        const parts = duration.split(':');
        const hours = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);
        return `${hours > 0 ? `${hours} hora(s) ` : ''}${minutes > 0 ? `${minutes} minuto(s)` : ''}`;
    };

    const formatOperatingDays = (days) => {
        return days.split(',').join(', ');
    };

    const createShareLink = () => {
        const serviceId = service.id; // o el campo que identifica unívocamente el servicio
        const baseUrl = window.location.origin; // Obtiene la URL base de la aplicación
        const serviceUrl = `${baseUrl}/servicios/${serviceId}`; // Construye la URL específica del servicio

        return serviceUrl;
    };

    const copyToClipboard = () => {
        const url = createShareLink();
        navigator.clipboard.writeText(url).then(() => {
            Swal.fire({
                title: '¡Listo!',
                text: 'Enlace copiado al portapapeles',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });
        }).catch(err => {
            console.error('Error al copiar el enlace: ', err);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo copiar el enlace',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        });
    };


    return (
        <>
            <div className="service-meta">
                <h3>{service.nombre}</h3>
                <p>Duración: {formatDuration(service.duracion)}</p>
                <p>Horario: De {service.operating_hours_start} a {service.operating_hours_end}</p>
                <p>Días hábiles: {formatOperatingDays(service.operating_days)}</p>
                {hasUserReserved && (
                    <>
                        <a href={createGoogleMapsLink(service.direccion)} target="_blank" rel="noopener noreferrer" className="google-maps-link">
                            Ver Ubicación en Google Maps
                        </a>
                        <button onClick={copyToClipboard} className="reserve-button">
                            Copiar Enlace para Compartir
                        </button>
                    </>
                )}
            </div>
            <button className="reserve-button" onClick={handleReserveClick}>Reservar</button>
        </>
    );

    // return (
    //     <>
    //         <div className="service-meta">
    //             <h3>{service.nombre}</h3>
    //             <p>Duración: {formatDuration(service.duracion)}</p>
    //             <p>Horario: De {service.operating_hours_start} a {service.operating_hours_end}</p>
    //             <p>Días hábiles: {formatOperatingDays(service.operating_days)}</p>
    //             {hasUserReserved && (
    //                 <a href={createGoogleMapsLink(service.direccion)} target="_blank" rel="noopener noreferrer" className="google-maps-link">
    //                     Ver Ubicación en Google Maps
    //                 </a>
    //             )}
    //         </div>
    //         <button className="reserve-button" onClick={handleReserveClick}>Reservar</button>
    //     </>
    // );
}


function ServiceDescription({ service, user }) {
    const backendUrl = "http://localhost:3008";
    return (
        <div className="service-description">
            <div className='des-cont'>
                <p className='descripcion-ser'>{service.descripcion}</p>
                <p>Precio: <b>${service.precio}</b></p>
                <p>Capacidad: {service.capacidad} personas máximo</p>
            </div>
            <div className='prop-detail'>
                <img src={`${backendUrl}/img/avatar/${user.avatar}`} className='img-service-owner' />
                <p>{user.nombre + ' ' + user.apellido}</p>
            </div>
        </div>
    );
}

function ServiceComments({ comments, hasUserReserved, token, user, service }) {
    const navigate = useNavigate();
    const backendUrl = "http://localhost:3008";
    const [commentData, setCommentData] = useState({
        comment: '',
        rating: ''
    });

    // Actualizar el estado con los datos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommentData({
            ...commentData,
            [name]: value
        });
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendUrl}/service/${service.id}/postComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    servicio_id: service.id,
                    usuario_dni: user.id,
                    rating: commentData.rating,
                    comment: commentData.comment
                })
            });

            console.log(response);

            if (!response.ok) {
                // Si la respuesta no está bien, mostrar un mensaje de error
                throw new Error('Hubo un problema con la solicitud: ' + response.statusText);
            }

            const data = await response.json();
            console.log(data);
            setCommentData({ rating: '', comment: '' });

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: '¡Comentario Creado!',
                text: 'Tu comentario ha sido creado con éxito.',
                showConfirmButton: false,
                timer: 1500,
                width: '300px',
                customClass: {
                    title: 'my-title-class',
                    content: 'my-content-class'
                }
            });

            navigate(`/service/${service.id}/detail`);
        } catch (error) {
            console.error('Error en la solicitud:', error);
            Swal.fire({
                position: "top-end",
                title: 'Error',
                text: 'Hubo un problema al crear el comentario: ' + error.message,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
                width: '300px',
                customClass: {
                    title: 'my-title-class',
                    content: 'my-content-class'
                }
            });
        }
    };

    return (
        <>
            {comments.length === 0 ? (
                <div>No hay comentarios aún.</div>
            ) : (
                <div className="service-comments">
                    {comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <p>{comment.comentario}</p>
                            <div className='com-u'>
                                <div className='prop-detail'>
                                    <img src={`${backendUrl}/img/avatar/${comment.user.avatar}`} className='img-comment-owner' />
                                    <p>{comment.user.nombre}</p>
                                    <RatingStars rating={comment.rating} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hasUserReserved && (
                <form onSubmit={handleSubmitComment}>
                    <div className="form-comment">
                        <div className='comment-left'>
                            <label htmlFor="comment">Tu Comentario:</label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={commentData.comment}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className='rating-right'>
                            <label>Tu Rating:</label>
                            <div className="rating">
                                {[...Array(5)].reverse().map((_, index) => {
                                    const ratingValue = 5 - index;
                                    return (
                                        <React.Fragment key={index}>
                                            <input
                                                type="radio"
                                                id={`star${ratingValue}`}
                                                name="rating"
                                                value={ratingValue}
                                                checked={commentData.rating === `${ratingValue}`}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor={`star${ratingValue}`}></label>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                        <button type="submit">Enviar Comentario</button>
                    </div>
                </form>
            )}
        </>
    );
}

export default ServiceDetail;
