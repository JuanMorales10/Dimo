import React from 'react';
import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import CardList from '../../components/Cards/Cards';
import Hero from '../../components/HeroSection/HeroSection';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <Hero />
      <section><CardList /></section>
      <Footer />
    </div>
  );
};

export default Home;
