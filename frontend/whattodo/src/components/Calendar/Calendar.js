import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { UserContext } from '../UserContext/UserContext';
import './Calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { useContext, useState } from 'react';
import Modal from '../ModalCalendar/ModalCalendar';

function Calendar() {
  const { events } = useContext(UserContext);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = ({ event }) => {
    const startDate = moment(event.start);
    const endDate = moment(event.end);
  
    if (startDate.isValid() && endDate.isValid()) {
      setSelectedEvent({
        title: event.title,
        start: startDate.locale('es').format('LLL'),
        end: endDate.locale('es').format('LLL'),
        cantidadPersonas: event.extendedProps.cantidadPersonas,
      });
    } else {
      console.error("Fecha inválida en el evento", event);
      // Manejo adicional para fechas inválidas
    }
  }
  

  return (
    <div className='calendar-dash'>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        locale={esLocale}
      />
      {selectedEvent && <Modal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}

export default Calendar;


