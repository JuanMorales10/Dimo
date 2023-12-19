import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { faHeart, faStar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { UserContext } from '../UserContext/UserContext';
import './Card.css';

function Card({ id, nombre, descripcion, precio, rating, imageUrl }) {

    const { token, user } = useContext(UserContext);
    const [images, setImages] = useState([])
    const [isFavorited, setIsFavorited] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/service/${id}/detail`);
    };

    const handleCarouselClick = (event) => {
        event.stopPropagation(); // Esto detiene la propagación del evento
    };

    const fetchService = async () => {
        try {
            const serviceResponse = await fetch(`http://localhost:3008/service/${id}/detail`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (serviceResponse.status !== 200) {
                throw new Error('Network response for service was not ok');
            }
            const serviceData = await serviceResponse.json();

            const filteredImages = serviceData.images.filter(image => /\.(jpg|jpeg|png|gif)$/i.test(image.url));
            setImages(filteredImages);
        } catch (error) {
            setError('Failed to load service details');
            console.error('There has been a problem with your fetch operation:', error);
        }
    };


    const toggleFavorite = async () => {
        setIsFavorited(!isFavorited);
        try {
            const response = await fetch(`http://localhost:3008/service/service/${id}/favorite`, {
                method: isFavorited ? 'DELETE' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log(response)
        } catch (error) {
            console.error('Error al actualizar favoritos:', error);
        }
    };

    const checkFavorite = async () => {
        try {
            const response = await fetch(`http://localhost:3008/service/service/${id}/favorite`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setIsFavorited(data.isFavorited);
        } catch (error) {
            console.error('Error al verificar favoritos:', error);
        }
    };

    useEffect(() => {
        fetchService();
        checkFavorite();
    }, [id]);

    const responsive = {
        all: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
        }
    };


    return (
        <div className="card-container" onClick={handleCardClick}>
            <div className="card">
            <div onClick={handleCarouselClick}>
                    <Carousel responsive={responsive} swipeable={true} showDots={true} arrows={false}>
                        {images.map((image, index) => (
                            <div key={index} className="carousel-img-container">
                                <img src={`http://localhost:3008/img/service/${image.url}`} className="card-img-top" alt="Service" />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="card-rating">
                    <FontAwesomeIcon icon={faStar} />
                    <span>{rating}</span>
                </div>
                <div className="card-favorite">
                    <button onClick={toggleFavorite} className="favorite-button">
                        <FontAwesomeIcon icon={faHeart} color={isFavorited ? '#ab0000' : 'black'} />
                    </button>
                </div>

                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <p>${precio}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;




