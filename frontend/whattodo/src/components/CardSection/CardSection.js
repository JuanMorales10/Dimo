import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './CardSection.css';

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
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CardSection = ({ nombre, images }) => {
  return (
    <div className="card">
      {images && images.length > 0 ? (
        <Carousel responsive={responsive} swipeable={true} showDots={true}>
          {images.map((img, index) => (
            <img key={index} src={`http://localhost:3008/img/service/${img.url}`}alt={`Imagen ${index}`} className="card-image" />
          ))}
        </Carousel>
      ) : (
        <div className="card-image-placeholder">
          {/* Puedes mostrar una imagen predeterminada o un mensaje si no hay imágenes */}
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">{nombre}</h3>
      </div>
      <button className="card-button">Descubrir</button>
    </div>
  );
};

export default CardSection;

