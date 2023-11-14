import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logowhat.png';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card.css';

function Card({ title, text, imageUrl, rating }) {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
        // Aquí puedes agregar la lógica para manejar los favoritos
    };

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-img-container">
                    <img src={imageUrl || logo} className="card-img-top" alt="Card image" />
                    <div className="card-rating">
                    <FontAwesomeIcon icon={faStar} />
                        <span>{rating}</span>
                    </div>
                    <div className="card-favorite">
                    <button onClick={toggleFavorite} className="favorite-button">
                    <FontAwesomeIcon icon={faHeart} color={isFavorited ? '#ab0000' : 'black'} /> 
                    </button>
                </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                    <Link to="#" className="card-link">Details</Link>
                </div>
            </div>
        </div>
    );
}

export default Card;



