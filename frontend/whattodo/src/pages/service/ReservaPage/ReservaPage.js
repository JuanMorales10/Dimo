import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../../components/UserContext/UserContext';
import ReservaForm from '../../../components/ReservaForm/ReservaForm';
import moment from 'moment';
import Swal from 'sweetalert2';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';

function ReservaPage() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { token, user, addEvent } = useContext(UserContext);
  const [error, setError] = useState('');
  const [service, setService] = useState(null); 



  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceResponse = await fetch(`http://localhost:3008/service/${serviceId}/detail`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (serviceResponse.status !== 200) {
          throw new Error('Network response for service was not ok');
        }
        const serviceData = await serviceResponse.json();
        console.log(serviceData)
        setService(serviceData);
      } catch (error) {
        setError('Failed to load service details');
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchService();
  }, [serviceId, token]);

  const handleSubmit = async (reserva) => {
    try {

      // Convertir la duración de formato HH:mm:ss a minutos
      const durationParts = service.service.duracion.split(':');
      const durationInMinutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);


      const fechaMoment = moment(reserva.fecha, 'YYYY-MM-DD');

      // Ajustar la hora según reserva.hora
      const horaParts = reserva.hora.split(':');
      if (horaParts.length !== 2 || isNaN(horaParts[0]) || isNaN(horaParts[1])) {
        throw new Error("El formato de la hora proporcionada no es válido.");
      }

      // Ahora puedes usar set para ajustar la hora y luego convertir a Date
      const fechaLocal = fechaMoment.set({
        hour: parseInt(horaParts[0]),
        minute: parseInt(horaParts[1]),
        second: 0
      }).toDate();

      console.log(fechaLocal)


      // Formatear manualmente la fecha y hora para mantener la zona horaria local
      const formatDate = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      };

      const startDateTimeLocal = formatDate(fechaLocal);
      console.log('startDateTimeLocal:', startDateTimeLocal)
      const endDateTimeLocal = formatDate(new Date(fechaLocal.getTime() + durationInMinutes * 60000));

      console.log(reserva.fecha)

      // Preparar los datos para la reserva
      const reservaData = {
        usuario_dni: user.profile.id,
        service_id: serviceId,
        start_datetime: startDateTimeLocal,
        end_datetime: endDateTimeLocal,
        duracion: durationInMinutes,
        cantidadPersonas: reserva.cantidadPersonas,
        nombreReserva: reserva.nombreReserva,
        nombreUsuario: reserva.nombreUsuario
      };

      console.log(reservaData)


      // Enviar la solicitud de reserva al backend
      const response = await fetch(`http://localhost:3008/reserva/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reservaData)
      });

      const reservaCreada = await response.json();
      if (!response.ok) {
        throw new Error(reservaCreada.message || 'Failed to create reservation');
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: '¡Reserva Creada!',
        text: `Tu reserva ha sido creada con éxito. ID del evento en Google Calendar: ${reservaCreada.googleEventId}`,
        showConfirmButton: false,
        timer: 1500,
        width: '300px',
        customClass: {
          title: 'my-title-class',
          content: 'my-content-class'
        }
      });

      // Ajustar aquí según cómo quieras manejar el evento en el frontend
      const newEvent = {
        title: `${reserva.nombreReserva} - ${reserva.nombreUsuario}`,
        start: reservaCreada.reservaResponse.start_datetime,
        end: reservaCreada.reservaResponse.end_datetime,
        extendedProps: {
          id: reservaCreada.reservaResponse.id,
          cantidadPersonas: reservaCreada.reservaResponse.cantidadPersonas,
        }
      };
      addEvent(newEvent);

      navigate('/dashboard/calendar');

    } catch (error) {
      Swal.fire({
        position: "top-end",
        title: 'Error',
        text: 'Hubo un problema al crear la reserva: ' + error.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        width: '300px',
        customClass: {
          title: 'my-title-class',
          content: 'my-content-class'
        }
      });
      setError(error.message);
    }
  };




  if (!service) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <ReservaForm service={service} onSubmit={handleSubmit} />
      <Footer />
    </>
  );
}

export default ReservaPage;
