import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ServiceCard from '../ServiceCard/ServiceCard';
import { UserContext } from '../UserContext/UserContext';
import { useTheme , Button} from '@mui/material';
import { Link } from 'react-router-dom';

function ServiceList() {
    const theme = useTheme();
    const isMobile = useTheme().breakpoints.down('sm'); // Ajusta este breakpoint si es necesario
    const { token, user } = useContext(UserContext);
    const [services, setServices] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        const loadServices = async () => {
            try {
                if (user && user.profile) {
                    const response = await fetch(`http://localhost:3008/service/userServices/${user.profile.id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (!response.ok) {
                        throw new Error('No se pudieron obtener los servicios');
                    }

                    const servicesData = await response.json();
                    setServices(servicesData.services);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        loadServices();
    }, [user?.profile?.id, token]);

    const handleEdit = (serviceId) => {
        // Aquí puedes establecer un estado con la información del servicio a editar
        // o abrir un modal/formulario para editar el servicio
        console.log('Editar servicio', serviceId);
        // Implementa la lógica de edición aquí
    };

    const handleDelete = async (serviceId) => {
        try {
            const response = await fetch(`http://localhost:3008/service/deleteService/${serviceId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el servicio');
            }
            setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{
            padding: '10px 20px',
            marginTop: {
                xs: '70px',
                sm: 0
            },
            height: '100vh'
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', m: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', height: '60px', borderRadius: '12px', margin: '0', background: 'linear-gradient(169deg, rgb(66, 66, 74), rgb(25, 25, 25));', backgroundColor: '#fff', justifyContent:"space-between" }}>
                <Typography variant="h4" component="h2" sx={{
                    marginLeft: '10px',
                    display: 'flex',
                    borderRadius: '12px',
                    fontWeight: 400,
                    fontSize: '1.725rem',
                    lineHeight: 1.235,
                    letterSpacing: '0.00735em',
                    color: 'white'
                }}>
                    Mis Servicios :
                </Typography>
                <Link to="/create-service" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" className="create-service" sx={{marginLeft:'20px', backgroundColor:'#f0f0f0', color:'black'}}>
                        Crear Servicio
                    </Button>
                </Link>
                {error && <p>Error: {error}</p>}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginTop: '10px',
                    justifyContent: 'center'
                }}
            >
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onEdit={() => handleEdit(service.id)}
                        onDelete={() => handleDelete(service.id)}
                    />
                ))}
            </Box>
        </Box>
    );

}


export default ServiceList;