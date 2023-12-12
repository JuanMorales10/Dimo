import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../components/UserContext/UserContext';
import ReservaForm from '../../../components/ReservaForm/ReservaForm';
import moment from 'moment';

function ReservaPage() {
  const { serviceId } = useParams();
  const { token, fetchUserProfile } = useContext(UserContext);
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
      const userProfile = await fetchUserProfile();
      const usuarioDni = userProfile ? userProfile.profile.id : null;

      console.log(reserva)
      
      // Convertir la duración de formato HH:mm:ss a minutos
      const durationParts = service.service.duracion.split(':');
      const durationInMinutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  
      console.log(`Duración en minutos: ${durationInMinutes}`)
  
      // Asegúrate de que reserva.fecha y reserva.hora estén en el formato correcto
      const startDateTime = moment.utc(reserva.fecha).set({
        hour: moment(reserva.hora, "HH:mm").hour(),
        minute: moment(reserva.hora, "HH:mm").minute()
      });
  
      // Ahora se añade la duración en minutos
      const endDateTime = moment.utc(startDateTime).add(durationInMinutes, 'minutes');
  
      const reservaData = {
        usuario_dni: usuarioDni,
        service_id: serviceId,
        start_datetime: startDateTime.toISOString(),
        end_datetime: endDateTime.toISOString(),
        duracion: durationInMinutes
      };
  
      console.log(reservaData)
  
      const response = await fetch(`http://localhost:3008/reserva/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reservaData)
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create reservation');
      }
      console.log('Reservation created:', data);
    } catch (error) {
      console.error('Error creating reservation:', error);
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
    <div className='reserva-container'>
      <ReservaForm serviceId={service.service.id} onSubmit={handleSubmit} />
    </div>
  );
}

export default ReservaPage;
