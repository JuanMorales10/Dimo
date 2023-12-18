import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel, Avatar } from '@mui/material';
import { UserContext } from '../UserContext/UserContext'; // Asegúrate de que esta es la ruta correcta
import NavBar from '../NavBar/NavBar';
import './UserProfile.css'; // Asegúrate de que tus estilos están definidos aquí

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando o no

    // Reemplaza con tus propios estados y lógica de efectos
    useEffect(() => {
        // Lógica de carga de datos del usuario o servicios
    }, [user?.profile?.id]);

    if (!user || !user.profile) {
        return <div>Loading...</div>;
    }

    // Funciones para manejar la edición de la información del perfil y el cambio de contraseña
    const handleEditInfo = () => {
        setIsEditing(!isEditing);
        // Aquí más lógica para manejar la edición
    };

    const handlePasswordChange = () => {
        // Lógica para manejar el cambio de contraseña
    };
    console.log(user.profile)

    return (
        <>
            <Box className="user-profile" sx={{
                display: 'flex',
                 flexDirection: 'column',
                  justifyContent: 'center',
                   padding: '10px 24px',
                    marginTop: {
                    xs: '70px',
                    sm: 0
                },
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', m: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', height: '110px', borderRadius: '12px', margin: '0', background: 'linear-gradient(169deg, rgb(66, 66, 74), rgb(25, 25, 25));', backgroundColor: '#fff' }}>
                    <Avatar
                        sx={{ width: 80, height: 80 }}
                        src={`http://localhost:3008/img/avatar/${user.profile.avatar}`}
                        alt={`${user.profile.nombre} ${user.profile.apellido}`}
                    />
                    <Typography variant="h5" sx={{ mt: 2, marginTop: '0', marginLeft: '10px', color: 'white' }}>
                        {`${user.profile.nombre} ${user.profile.apellido ? user.profile.apellido : ''}`}
                    </Typography>
                    {/* Agrega aquí más detalles del perfil */}
                </Box>

                {/* Formulario de Información Básica */}
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, margin: '20px 0px' }}>
                    {/* Cambiar esta sección según corresponda para edición o visualización */}
                    {isEditing ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', backgroundColor: '#fff' }} >
                            <Typography variant="h5" sx={{ mt: 2, margin: '10px 0', display: 'flex', padding: '15px', }}>
                                Informacion de Usuario:
                            </Typography>
                            <TextField label="Nombre" variant="outlined" defaultValue={user.profile.nombre} sx={{ margin: '10px' }} />
                            <TextField label="Apellido" variant="outlined" defaultValue={user.profile.apellido} sx={{ margin: '10px' }} />
                            <TextField label="Email" variant="outlined" defaultValue={user.profile.email} sx={{ margin: '10px' }} />
                            <TextField label="Dni" variant="outlined" defaultValue={user.profile.id} sx={{ margin: '10px' }} />
                            {/* Agrega todos los campos necesarios */}
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', borderRadius: '12px', backgroundColor: '#fff' }} >
                                <Typography variant="h5" sx={{ mt: 2, margin: '10px 0', display: 'flex', padding: '15px', }}>
                                    Informacion de Usuario:
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px', justifyContent: 'flex-start', }}>
                                    <Typography variant='label' sx={{ fontSize: '18px', width: '112px', display: 'flex' }}>Nombre: </Typography>
                                    <Typography>{user.profile.nombre}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                                    <Typography variant='label' sx={{ fontSize: '18px', width: '112px', display: 'flex' }}>Apellido: </Typography>
                                    <Typography>{user.profile.apellido}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                                    <Typography variant='label' sx={{ fontSize: '18px', width: '112px', display: 'flex' }}>Email: </Typography>
                                    <Typography>{user.profile.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                                    <Typography variant='label' sx={{ fontSize: '18px', width: '112px', display: 'flex' }}>Dni: </Typography>
                                    <Typography>{user.profile.id}</Typography>
                                </Box>
                            </Box>
                        </>
                    )}

                    {/* Botones para cambiar el estado de edición */}
                    <Button onClick={handleEditInfo}>{isEditing ? 'Guardar Cambios' : 'Editar Perfil'}</Button>

                    {/* Formulario de Cambio de Contraseña */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', borderRadius: '12px', backgroundColor: '#fff' }} >
                        <Typography variant="h5" sx={{ mt: 2, margin: '10px 0', display: 'flex', padding: '15px', }}>Change Password</Typography>
                        <TextField label="Current Password" variant="outlined" type="password" />
                        <TextField label="New Password" variant="outlined" type="password" sx={{ my: 2 }} />
                        <TextField label="Confirm New Password" variant="outlined" type="password" />
                        <Button onClick={handlePasswordChange}>Update Password</Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default UserProfile;
