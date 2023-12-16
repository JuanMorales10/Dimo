import React, { useState, useEffect } from 'react';
import './Hero.css'; // Asegúrate de crear un archivo Hero.css para tus estilos
import backgroundvideo from '../../assets/video.mp4'; // Reemplaza con tu imagen de fondo
import SearchBar from '../SearchBar/SearchBar';

const Hero = () => {

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const period = 1500;
  const toRotate = ["Proxima aventura", "Proximo Destino"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <div className="hero-cont">
        <video autoPlay loop muted className="background-video">
          <source src={backgroundvideo} type="video/mp4" />
        </video>
        <div className={`hero-content ${isModalOpen ? 'modal-open' : ''}`}>
          <div className='container-title'>
            <h1 className='hero-title'>
              {`Descubre tu `}
              <span className="txt-rotate" dataPeriod="1000" data-rotate='["Proxima aventura", "Proximo Destino"]'>
                <span className="wrap">{text}</span>
              </span>
            </h1>
          </div>
          <>
          <SearchBar onModalOpen={handleModalOpen} onModalClose={handleModalClose}  />
          </>
        </div>
      </div>
    </>
  );
};

export default Hero;
