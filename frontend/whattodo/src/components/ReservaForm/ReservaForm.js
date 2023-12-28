import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import { parseISO } from 'date-fns';
import moment from 'moment'
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es'; 
import './ReservaForm.css';
import Swal from 'sweetalert2';
registerLocale('es', es); 

function ReservaForm({ service, onSubmit }) {
  const { serviceId } = useParams();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [availableSlots, setAvailableSlots] = useState({ dates: [], times: [] });
  const [reserva, setReserva] = useState({
    servicio_id: serviceId,
    fecha: new Date(),
    hora: '',
    cantidadPersonas: 1,
    nombreReserva: service ? service.service.nombre : '',
    nombreUsuario: user ? user.profile.nombre : '',
    usuario_dni: user ? user.profile.id : '',
    precio: service ? service.service.precio : ''
  });
  const [metodoPago, setMetodoPago] = useState('');


  const handlePayment = async () => {
    sessionStorage.setItem('reservaActual', JSON.stringify(reserva));

    const servicioFinal = {
      nombre: reserva.nombreReserva,
      precio: reserva.precio,
      id: serviceId
    };

    try {
      const response = await fetch('http://localhost:3008/service/mercado-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicioFinal)
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pago');
      }

      const resultadoPago = await response.json();

      if (resultadoPago) {
        window.location.href = resultadoPago;
      } else {
        Swal.fire('Error', 'No se pudo obtener la URL de pago', 'error');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      Swal.fire('Error', 'Error al procesar el pago: ' + error.message, 'error');
    }
  };

  useEffect(() => {
    const reservaGuardada = sessionStorage.getItem('reservaActual');
    if (reservaGuardada) {
      const reservaParseada = JSON.parse(reservaGuardada);

      // Convierte la fecha de vuelta a un objeto de fecha
      reservaParseada.fecha = new Date(reservaParseada.fecha);

      setReserva(reservaParseada);
      sessionStorage.removeItem('reservaActual');
    }
  }, []);



  useEffect(() => {
    fetchAvailableSlots(reserva.fecha);
  }, [serviceId, reserva.fecha]);

  useEffect(() => {
    if (availableSlots.times.length > 0 && reserva.hora === '') {
      setReserva(prevState => ({
        ...prevState,
        hora: availableSlots.times[0]
      }));
    }
  }, [availableSlots.times]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('collection_status');
    if (paymentStatus === 'approved') {
      setPaymentConfirmed(true);
    }
  }, [location]);

  useEffect(() => {
    if (paymentConfirmed) {
      console.log(reserva)
      onSubmit(reserva);
    }
  }, [paymentConfirmed, reserva, onSubmit]);


  const fetchAvailableSlots = async (selectedDate) => {

    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    try {
      const response = await fetch(`http://localhost:3008/service/${serviceId}/available-slots?date=${formattedDate}`);
      const slots = await response.json();

      const times = slots.map(slot => {
        const date = new Date(slot);
        // Convertir a hora local
        const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        return `${localDate.getHours().toString().padStart(2, '0')}:${localDate.getMinutes().toString().padStart(2, '0')}`;
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


  return (
    <div className='res-page'>
      <div className="reserva-form-container">
        <h2>Reserva tu experiencia</h2>
        <form className="reserva-form">
          {/* Input para la cantidad de personas */}

          <div className="form-group">
            <label htmlFor="datePicker">Selecciona Fecha:</label>
            <DatePicker
              selected={reserva.fecha}
              onChange={handleDateChange}
              name="fecha"
              inline
              className="mi-clase-datepicker"
              style={{ backgroundColor: 'lightblue' }}
              locale="es" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="cantidadPersonas">Cuántas personas van?</label>
            <label htmlFor="cantidadPersonas">Maximo {service.service.capacidad} personas</label>
            <input
              type="number"
              name="cantidadPersonas"
              value={reserva.cantidadPersonas}
              onChange={handleChange}
              min="1"
              max={service.service.capacidad}
              required
            />
            <label htmlFor="timePicker">Selecciona una Hora</label>
            <select name="hora" id="timePicker" value={reserva.hora} onChange={handleChange}>
              {availableSlots.times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <button type="button" className="book-now-btn" onClick={handlePayment}>
              Pagar Ahora
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ReservaForm;
