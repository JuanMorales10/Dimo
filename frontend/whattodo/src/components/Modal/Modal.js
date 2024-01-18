import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { faMoneyBill, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

function Modal({ closeModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fechaRango: [null, null],
    capacidad: '',
    disponibilidad: true,
    atp: true,
  });

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    if (name === 'atp') {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : false });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFormData({ ...formData, fechaRango: [start, end] });
  };

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
            <div className="filters">
              <div>
              <div className='flex'>
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <label>Duracion del Viaje</label>
                  <DatePicker
                    selectsRange={true}
                    startDate={formData.fechaRango[0]}
                    endDate={formData.fechaRango[1]}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    locale={es}
                  />
                </div>
              </div>
              <div className='fl-fa'>
                <div className='flex'>
                <FontAwesomeIcon icon={faUsers} />
                <input
                  type="number"
                  placeholder="Cantidad de personas"
                  value={formData.capacidad}
                  onChange={handleInputChange}
                  name="capacidad"
                />
                </div>
                <div className='fl'>
                  <h6 htmlFor="atp"> +18:</h6>
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
