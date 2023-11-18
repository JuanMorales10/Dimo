import React, { useState } from 'react';
import  Modal  from '../Modal/Modal'; 
import './SearchBar.css'

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="search-bar-container">
      <input type="text" placeholder="Busca una Experiencia" className='searchprin' onClick={openModal} />
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  )
}
export default SearchBar;
