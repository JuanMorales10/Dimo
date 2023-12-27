import './ModalCalendar.css';

function Modal({ event, onClose }) {
  console.log(event)
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{event.title}</h2>
        <p>Inicio: {event.start.toString()}</p>
        <p>Fin: {event.end.toString()}</p>
        <p>Cantidad de Personas: {event.cantidadPersonas}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
