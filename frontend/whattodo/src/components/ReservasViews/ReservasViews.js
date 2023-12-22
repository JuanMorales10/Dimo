import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserContext } from '../UserContext/UserContext';
import moment from 'moment';
import Reserva from '../Reserva/Reserva';

const ReservasView = () => {
    const { events } = useContext(UserContext);
    const [reservasViejas, setReservasViejas] = useState([]);
    const [proximasReservas, setProximasReservas] = useState([]);

    useEffect(() => {
        if (events && events.length > 0) {
            const hoy = moment().utc(); 
            const viejas = events.filter(reserva =>
                moment.utc(reserva.start).isBefore(hoy, 'day')
            );
            const proximas = events.filter(reserva =>
                moment.utc(reserva.start).isSameOrAfter(hoy, 'day')
            );

            console.log('Eventos:', events);
            console.log('Reservas Viejas:', viejas);
            console.log('Próximas Reservas:', proximas);

            setReservasViejas(viejas);
            setProximasReservas(proximas);
        }
    }, [events]);


    return (
        <Box sx={{
            padding: '10px 20px',
            marginTop: {
                xs: '70px',
                sm: 0
            },
            height: '100vh'
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', m: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', height: '60px', borderRadius: '12px', margin: '0', background: 'linear-gradient(169deg, rgb(66, 66, 74), rgb(25, 25, 25));', backgroundColor: '#fff', justifyContent: "space-between", marginBottom:'10px' }}>
                <Typography variant="h4" align='center' sx={{
                    marginLeft: '10px',
                    display: 'flex',
                    borderRadius: '12px',
                    fontWeight: 400,
                    fontSize: '1.725rem',
                    lineHeight: 1.235,
                    letterSpacing: '0.00735em',
                    color: 'white'
                }}>
                    Reservas Viejas</Typography>
            </Box>
            {reservasViejas.map((reserva, index) => (
                <Reserva key={index} reserva={reserva} index={index} />
            ))}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', m: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12), 0 7px 8px -5px rgba(0,0,0,0.2);', padding: '15px', height: '60px', borderRadius: '12px', margin: '0', background: 'linear-gradient(169deg, rgb(66, 66, 74), rgb(25, 25, 25));', backgroundColor: '#fff', justifyContent: "space-between" }}>
                <Typography variant="h4" align='center' sx={{
                    marginLeft: '10px',
                    display: 'flex',
                    borderRadius: '12px',
                    fontWeight: 400,
                    fontSize: '1.725rem',
                    lineHeight: 1.235,
                    letterSpacing: '0.00735em',
                    color: 'white'
                }}>
                    Próximas Reservas</Typography>
            </Box>
            {proximasReservas.map((reserva, index) => (
                <Reserva key={index} reserva={reserva} index={index} />
            ))}
        </Box>
    );
};

export default ReservasView;

