import React from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import moment from 'moment';
import 'moment/locale/es'; // Importar localización en español
import './Reserva.css'
import { Navigate, useNavigate } from 'react-router-dom';

moment.locale('es'); // Establecer español como idioma por defecto

const Reserva = ({ reserva, index }) => {
    const navigate = useNavigate();
    const { title, start } = reserva;


    // Formatear fecha y hora
    const fecha = moment(start).format('D [de] MMMM, YYYY');
    const hora = moment(start).format('HH:mm'); 

    const handleButtonClick = () => {
        navigate(`/service/${reserva.extendedProps.id}/detail`);
    };

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', backgroundColor: '#fff', justifyContent: 'space-between', margin: '10px', alignItems: 'center' }}>
            <h2>{index + 1}</h2>
            <h6>{title}</h6>
            <div className='res-div'>
                <p>Dia:</p>
                <p>{fecha}</p>
            </div>
            <div className='res-div'>
                <p>
                    Hora:
                </p>
                <p>{hora}</p>
            </div>
            <Button variant="contained" color="primary" onClick={handleButtonClick} sx={{ width: '20px', fontSize: '12px', backgroundColor:'#15afcf' }}>
                Detalle del Servicio
            </Button>
        </Box>
    );
};

export default Reserva;
