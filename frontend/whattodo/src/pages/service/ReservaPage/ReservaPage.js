import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../components/UserContext/UserContext';
import ReservaForm from '../../../components/ReservaForm/ReservaForm'; 

function ReservaPage() {
    const { serviceId } = useParams();
    const { token } = useContext(UserContext);
    const [error, setError] = useState('');
    const [service, setService] = useState(null);

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

    useEffect(() => {
        fetchService();
    }, [serviceId]); // Asegúrate de agregar serviceId como dependencia

    const handleSubmit = async (reserva) => {
    
        console.log(reserva)
    
        // try {
        //     const response = await fetch(`http://localhost:3008/reservas`, {
        //         method: 'POST',
        //         headers: { 
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`
        //         },
        //         body: JSON.stringify(reserva)
        //     });
        //     const data = await response.json();
        //     if (!response.ok) {
        //         throw new Error(data.message || 'Failed to create reservation');
        //     }
        //     // Manejo de la respuesta exitosa
        //     console.log('Reservation created:', data);
        //     // Redireccionar o mostrar mensaje de éxito
        // } catch (error) {
        //     console.error('Error creating reservation:', error);
        //     setError(error.message);
        // }
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
