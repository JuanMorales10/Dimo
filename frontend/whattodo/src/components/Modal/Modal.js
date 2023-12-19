import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';
import gast from '../../assets/img/gastonomia.jpg';
import vit from '../../assets/img/winery.jpg';
import aven from '../../assets/img/aventura.jpg';
import noche from '../../assets/img/noche.jpg';
import trans from '../../assets/img/transporte.jpg';

function Modal({ closeModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    categoria_id: '',
    fechaInicio: '',
    fechaFin: '',
    precioMin: '',
    precioMax: '',
    capacidad: '',
    disponibilidad: true,
    rating: '',
    atp: '',
  });

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    if (name === 'atp') {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : false });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, categoria_id: category });
  };

  // const validateForm = () => {
  //   if (formData.precioMin && formData.precioMax && formData.precioMin > formData.precioMax) {
  //     alert('El precio mínimo no puede ser mayor que el precio máximo.');
  //     return false;
  //   }
  //   return true;
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) return;

    console.log(formData)

    try {
      const response = await fetch('http://localhost:3008/service/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)

      navigate('/search-results', { state: { services: data } });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={closeModal}>&times;</button>
          <h2 className='modal-search'>Buscar</h2>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className='info-cont'>
            <input
              type="text"
              placeholder="Ej: Nombre de la Experiencia"
              className="search-input"
              value={formData.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
            <div className='precio-cont'>
              <FontAwesomeIcon icon={faMoneyBill} />
              <input
                type="number"
                placeholder="Precio mínimo"
                value={formData.precioMin}
                onChange={handleInputChange}
                name="precioMin"
              />
              <input
                type="number"
                placeholder="Precio máximo"
                value={formData.precioMax}
                onChange={handleInputChange}
                name="precioMax"
              />
            </div>
          </div>
          <div className='info-cont'>
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
          <div className='info-cont'>
            <h5 className='titulos'>Filtrado Por:</h5>
            <div className="filters">
              <div>
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>
                <label>Fecha Inicio</label>
                <input
                  type="date"
                  value={formData.fechaInicio}
                  onChange={handleInputChange}
                  name="fecha"
                />
                <div>
                  <label>Fecha Fin</label>
                  <input
                    type="date"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                    name="fecha"
                  />
                </div>
              </div>
              <div>
                <FontAwesomeIcon icon={faUsers} />
                <input
                  type="number"
                  placeholder="Capacidad"
                  value={formData.capacidad}
                  onChange={handleInputChange}
                  name="capacidad"
                />
                <div className='fl'>
                  <label htmlFor="atp">ATP:</label>
                  <input
                    type="checkbox"
                    id="atp"
                    name="atp"
                    checked={formData.atp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='info-cont'>
            <button type="submit" className="search-button">Busca tu experiencia</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
