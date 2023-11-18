import React from 'react';
import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import Carousel from 'react-multi-carousel';
import SearchBar from '../../components/SearchBar/SearchBar';
import Card from '../../components/Card/Card';
import CardList from '../../components/Cards/Cards';
import Hero from '../../components/HeroSection/HeroSection';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home-container">
     <NavBar />
     <Hero />
      <CardList />
      <Footer /> 
    </div>
  );
};

export default Home;
