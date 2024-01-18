import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, TextField, Button, Avatar, FormControlLabel, Switch } from '@mui/material';
import { UserContext } from '../UserContext/UserContext';
import NavBar from '../NavBar/NavBar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './UserProfile.css';
import Swal from 'sweetalert2';


const UserProfile = () => {
    const { token, user, fetchUserProfile } = useContext(UserContext);
    const clientIdCalendar = process.env.CLIENT_ID_CALENDAR;
    const [isConnectedToGoogleCalendar, setIsConnectedToGoogleCalendar] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        avatar: null,
        type: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const checkGoogleCalendarConnection = async () => {
        try {
            const response = await fetch('http://localhost:3008/user/checkGoogleCalendar', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data)
            setIsConnectedToGoogleCalendar(data.isConnected);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    useEffect(() => {
        if (user && user.profile) {
            setFormData({
                nombre: user.profile.nombre || '',
                apellido: user.profile.apellido || '',
                email: user.profile.email || '',
                telefono: user.profile.telefono || '',
                direccion: user.profile.direccion || '',
                avatar: user.profile.avatar || '',
                type: user.profile.type
            });
            checkGoogleCalendarConnection()
        }
    }, [user, token]);

    console.log(isConnectedToGoogleCalendar)


    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleTypeChange = (event) => {
        setFormData({ ...formData, type: event.target.checked ? 'Host' : 'Personal' });
    };

    const handleLinkGoogle = async () => {
        try {
            const response = await fetch('http://localhost:3008/auth/google/start', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }


        const result = await Swal.fire({
            title: '¿Estás seguro de que quieres cambiar tu contraseña?',
            text: "¡Asegúrate de recordar tu nueva contraseña!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15afcf',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambiarla!',
            cancelButtonText: 'No, cancelar'
        });

        if (result.isConfirmed) {

            // Crea el objeto con los datos de la contraseña
            const passwordUpdateData = {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            };

            try {
                const response = await fetch('http://localhost:3008/user/updateProfile', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(passwordUpdateData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Manejo de la respuesta
                alert('Contraseña actualizada con éxito');
            } catch (error) {
                console.error('Error al actualizar la contraseña:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: '¿Estás seguro de que quieres actualizar tu perfil?',
            text: "¡No podrás revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15afcf',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualizar!',
            cancelButtonText: 'No, cancelar'
        });

        if (result.isConfirmed) {

            const updatedData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key !== 'avatar') {
                    updatedData.append(key, formData[key]);
                }
            });

            if (avatarFile) {
                updatedData.append('avatar', avatarFile);
            }


            try {
                const response = await fetch('http://localhost:3008/user/updateProfile', {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: updatedData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                await fetchUserProfile();
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };


    if (!user || !user.profile) {
        return <LoadingScreen />;
    }

    const handleDisconnectGoogleCalendar = async () => {
        try {
            const response = await fetch('http://localhost:3008/user/disconnectGoogleCalendar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                setIsConnectedToGoogleCalendar(false);
                Swal.fire({
                    title: 'Desconexión exitosa',
                    text: 'Se ha desconectado de Google Calendar correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                });
            } else {
                throw new Error('Error al desconectar de Google Calendar');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al desconectar de Google Calendar.',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Cerrar'
            });
        }
    };
    



    const handleEditInfo = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            <Box className="user-profile" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px 24px', marginTop: { xs: '70px', sm: 0 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', m: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2)', padding: '15px', height: '110px', borderRadius: '12px', margin: '0', background: 'linear-gradient(169deg, rgb(66, 66, 74), rgb(25, 25, 25))', backgroundColor: '#fff' }}>
                    <Avatar sx={{ width: 80, height: 80 }} src={`http://localhost:3008/img/avatar/${user.profile.avatar}`} alt={`${user.profile.nombre} ${user.profile.apellido}`} />
                    <Typography variant="h5" sx={{ mt: 2, marginTop: '0', marginLeft: '10px', color: 'white' }}>
                        {`${user.profile.nombre} ${user.profile.apellido ? user.profile.apellido : ''}`}
                    </Typography>
                    {isConnectedToGoogleCalendar ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', flexDirection:'column-reverse', width:'50%'}}>      
                            <Typography sx={{fontSize:'12px', color:'white'}}>Estás conectado con Google Calendar.</Typography>
                            <Button onClick={handleDisconnectGoogleCalendar} variant="contained">
                                Desconectar
                            </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <Button onClick={handleLinkGoogle} variant="contained" color="primary">
                                Vincular con Google Calendar
                            </Button>
                        </Box>
                    )}
                </Box>


                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, margin: '20px 0px' }}>
                    {isEditing ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', backgroundColor: '#fff' }}>
                            <form onSubmit={handleSubmit} className='formedit' >
                                <TextField label="Nombre" variant="outlined" name="nombre" value={formData.nombre} onChange={handleInputChange} sx={{ margin: '10px' }} />
                                <TextField label="Apellido" variant="outlined" name="apellido" value={formData.apellido} onChange={handleInputChange} sx={{ margin: '10px' }} />
                                <TextField label="Email" variant="outlined" name="email" value={formData.email} onChange={handleInputChange} sx={{ margin: '10px' }} />
                                <TextField label="Teléfono" variant="outlined" name="telefono" value={formData.telefono} onChange={handleInputChange} sx={{ margin: '10px' }} />
                                <TextField label="Dirección" variant="outlined" name="direccion" value={formData.direccion} onChange={handleInputChange} sx={{ margin: '10px' }} />

                                <input type="file" name="avatar" onChange={handleFileChange} />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.type === 'Host'}
                                            onChange={handleTypeChange}
                                            name="type"
                                            color="primary"
                                        />
                                    }
                                    label="Cambiar a Administrador"
                                />
                                <Button type="submit" sx={{ margin: '10px' }}>Guardar Cambios</Button>
                            </form>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', backgroundColor: '#fff' }}>
                                <Typography variant="h5" sx={{ mt: 2, margin: '10px 0', display: 'flex', padding: '15px' }}>Informacion de Usuario:</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px', justifyContent: 'flex-start' }}>
                                    <Typography variant="body1" sx={{ fontSize: '18px', width: '112px' }}>Nombre: </Typography>
                                    <Typography variant="body1">{user.profile.nombre}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                                    <Typography variant="body1" sx={{ fontSize: '18px', width: '112px' }}>Apellido: </Typography>
                                    <Typography variant="body1">{user.profile.apellido}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                                    <Typography variant="body1" sx={{ fontSize: '18px', width: '112px' }}>Email: </Typography>
                                    <Typography variant="body1">{user.profile.email}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                                    <Typography variant="body1" sx={{ fontSize: '18px', width: '112px' }}>Teléfono: </Typography>
                                    <Typography variant="body1">{user.profile.telefono}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                                    <Typography variant="body1" sx={{ fontSize: '18px', width: '112px' }}>Dirección: </Typography>
                                    <Typography variant="body1">{user.profile.direccion}</Typography>
                                </Box>
                            </Box>
                            <Button onClick={handleEditInfo} sx={{ margin: '10px' }}>{isEditing ? 'Guardar Cambios' : 'Editar Perfil'}</Button>
                        </>
                    )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', backgroundColor: '#fff' }}>
                    <form onSubmit={handlePasswordUpdate} className='formedit' >
                        <TextField
                            label="Contraseña Actual"
                            variant="outlined"
                            type="password"
                            name="currentPassword"
                            onChange={handlePasswordChange}
                            sx={{ margin: '10px' }}
                        />
                        <TextField
                            label="Nueva Contraseña"
                            variant="outlined"
                            type="password"
                            name="newPassword"
                            onChange={handlePasswordChange}
                            sx={{ margin: '10px' }}
                        />
                        <TextField
                            label="Confirmar Nueva Contraseña"
                            variant="outlined"
                            type="password"
                            name="confirmPassword"
                            onChange={handlePasswordChange}
                            sx={{ margin: '10px' }}
                        />
                        <Button type="submit">Actualizar Contraseña</Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default UserProfile;

