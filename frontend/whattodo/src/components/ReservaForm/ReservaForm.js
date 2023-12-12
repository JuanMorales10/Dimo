import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservaForm.css';

function ReservaForm({ serviceId, onSubmit }) {
  // Estado inicial
  const [reserva, setReserva] = useState({
    servicio_id: serviceId,
    fecha: new Date(),
    hora: '',
  });
  const [availableSlots, setAvailableSlots] = useState({ dates: [], times: [] });

  // Carga inicial de slots disponibles
  useEffect(() => {
    fetchAvailableSlots(reserva.fecha);
  }, [serviceId, reserva.fecha]);

  // Función para cargar los slots disponibles
  const fetchAvailableSlots = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    try {
      const response = await fetch(`http://localhost:3008/service/${serviceId}/available-slots?date=${formattedDate}`);
      const slots = await response.json();
      
      // Separar las fechas y las horas
      const times = slots.map(slot => {
        const date = new Date(slot);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      });

      setAvailableSlots({ dates: [formattedDate], times });
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleDateChange = (date) => {
    setReserva({ ...reserva, fecha: date, hora: '' });
    fetchAvailableSlots(date);
  };

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reserva);
  };

  return (
    <div className="reserva-form-container">
      <h2>Reserve Your Experience</h2>
      <form onSubmit={handleSubmit} className="reserva-form">
        <label htmlFor="datePicker">Select Date</label>
        <DatePicker
          selected={reserva.fecha}
          onChange={handleDateChange}
          name="fecha"
          filterDate={() => true}
        />
        <label htmlFor="timePicker">Select Time</label>
        <select name="hora" id="timePicker" value={reserva.hora} onChange={handleChange}>
          {availableSlots.times.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
        <button type="submit" className="book-now-btn">Book Now</button>
      </form>
    </div>
  );
}

export default ReservaForm;

