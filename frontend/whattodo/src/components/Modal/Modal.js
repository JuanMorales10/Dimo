import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

function Modal({ closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={closeModal}>&times;</button>
          <h2>Buscar</h2>
        </div>
        <div className="modal-body">
          <input type="text" placeholder="Ej: Nombre de la Experiencia" className="search-input" />
            <h3 className='titulos'>Elije una Categoria</h3>
          <div className="categories">
            <button className="category-button">Gastronomia</button>
            <button className="category-button">Bodegas</button>
            <button className="category-button">Aventura</button>
            <button className="category-button">Transporte</button>
            <button className="category-button">Noche</button>
          </div>
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
          <button className="search-button">Busca tu experiencia</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;