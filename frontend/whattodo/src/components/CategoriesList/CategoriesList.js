import React, { useState, useEffect, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';
import './cards.css';

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  // ...resto de tu código...

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Aquí necesitas ajustar esta llamada para obtener los servicios por categoría
        const response = await fetch("http://localhost:3008/service/servicesByCategory");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        setCategories(result); // Asumiendo que result es un arreglo de categorías
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  // ...resto de tu código...

  return (
    <div>
      {categories.map((category) => (
        <div className={`card-list ${isVisible ? 'fade-in' : ''}`} ref={cardListRef} key={category.id}>
          <h2>{category.name}</h2> {/* Nombre de la categoría */}
          <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
            {category.services.map((service) => {
              return <Card key={service.id} {...service} />;
            })}
          </Carousel>
        </div>
      ))}
    </div>
  );
}

export default CategoriesList;
