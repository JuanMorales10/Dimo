import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import gast from '../../assets/img/gastonomia.jpg';
import vit from '../../assets/img/winery.jpg';
import aven from '../../assets/img/aventura.jpg';
import noche from '../../assets/img/noche.jpg';
import trans from '../../assets/img/transporte.jpg';

function Modal({ closeModal }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({})

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, categoria_id: category });
  };
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={closeModal}>&times;</button>
          <h2>Buscar</h2>
        </div>
        <div className="modal-body">
          <input type="text" placeholder="Ej: Nombre de la Experiencia" className="search-input" />
          <div>
          <div>
          <h3 className='titulos'>Elije una Categoria</h3>
          <div className="categories-container">
            <div>
              <button type='button' className="category-button" onClick={() => handleCategorySelect('2')} name='categoria_id'>
                <img src={gast} alt="Gastronomy" />
              </button>
              Gastronomia
            </div>
            <div>
              <button type='button' className="category-button" onClick={() => handleCategorySelect('1')} name='categoria_id'>
                <img src={vit} alt="Wineries" />
              </button>
              Vitivinicola
            </div>
            <div>
              <button type='button' className="category-button" onClick={() => handleCategorySelect('4')} name='categoria_id'>
                <img src={aven} alt="Adventure" />
              </button>
              Aventura
            </div>
            <div>
              <button type='button' className="category-button" onClick={() => handleCategorySelect('3')} name='categoria_id'>
                <img src={trans} alt="Transport" />
              </button>
              Transporte
            </div>
            <div>
              <button type='button' className="category-button" onClick={() => handleCategorySelect('5')} name='categoria_id'>
                <img src={noche} alt="Nightlife" />
              </button>
              Noche
            </div>
          </div>
          </div>
          <div>
          <h5 className='titulos'>Filtrado Por:</h5>
          <div className="filters">
            <div>
              <FontAwesomeIcon icon={faCalendarDays} />
              <input placeholder='Fecha' type='date'></input>
            </div>
            <div>
              <FontAwesomeIcon icon={faMoneyBill} />
              <input placeholder='Precio'></input>
            </div>
            <div>
              <FontAwesomeIcon icon={faUsers} />
              <input placeholder='Capacidad'></input>
            </div>
          </div>
          </div>
          </div>
          <button className="search-button">Busca tu experiencia</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;