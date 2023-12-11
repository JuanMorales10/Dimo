import React from 'react';
import './ListaReservas.css';

function ListaReservas({ reservas, onCancel }) {
  return (
    <ul>
      {reservas.map((reserva) => (
        <li key={reserva.order_id}>
          Servicio: {reserva.servicio.nombre}, Fecha: {reserva.start_datetime} a {reserva.end_datetime}
          <button onClick={() => onCancel(reserva.order_id)}>Cancelar</button>
        </li>
      ))}
    </ul>
  );
}

export default ListaReservas;
