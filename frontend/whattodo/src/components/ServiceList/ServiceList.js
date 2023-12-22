import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ServiceCard from '../ServiceCard/ServiceCard';
import { UserContext } from '../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTheme , Button} from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ServiceList.css'

function ServiceList() {
    const navigate = useNavigate();
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
        navigate(`/edit-service/${serviceId}`);
    };

    const handleDelete = async (serviceId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'my-confirm-button',
                cancelButton: 'my-cancel-button'
            },
            buttonsStyling: true
        });
    
        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: "No, cancelar",
            width: '350px',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3008/service/deleteService/${serviceId}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
    
                    const data = await response.json();
                    console.log(data)
                    if (response.ok) {
                        setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
    
                        swalWithBootstrapButtons.fire({
                            title: "Eliminado!",
                            text: "El servicio ha sido eliminado.",
                            icon: "success"
                        });
                    } else {
                        throw new Error(data.error || 'No se pudo eliminar el servicio');
                    }
                } catch (error) {
                    setError(error.message);
    
                    swalWithBootstrapButtons.fire({
                        title: "Error",
                        text: "Hubo un problema al eliminar el servicio: " + error.message,
                        icon: "error"
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu servicio está seguro :)",
                    icon: "error"
                });
            }
        });
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
            </Box>
                {error && <p>Error: {error}</p>}
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