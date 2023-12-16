import React, { useState } from 'react';
import  Modal  from '../Modal/Modal'; 
import './SearchBar.css'

const SearchBar = ({ onModalOpen, onModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const openModal = () => {
    setIsModalOpen(true);
    onModalOpen(); // Notifica al componente padre que el modal está abierto
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onModalClose(); // Notifica al componente padre que el modal está cerrado
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Busca una Experiencia"
        className='searchprin'
        onClick={openModal}
      />
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
}
export default SearchBar;
