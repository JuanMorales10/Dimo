import React from 'react';
import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import Carousel from 'react-multi-carousel';
import SearchBar from '../../components/SearchBar/SearchBar';
import Card from '../../components/Card/Card';
import Cards from '../../components/Cards/Cards';

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <SearchBar />
      <div className="cards-container">
       <Cards />
      </div>
    </div>
  );
};

export default Home;
