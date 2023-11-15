import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Card/Card';
import './cards.css';

function Cards() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <div>
      <h2>Ultimas Experiencias Cargadas</h2>
        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
     <Card />
     <Card /><Card /><Card /><Card /><Card /><Card /><Card />
    </Carousel>
    <h2>Gastronomia</h2>
    <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
     <Card />
     <Card /><Card /><Card /><Card /><Card /><Card /><Card />
    </Carousel>
    </div>
  )
}

export default Cards