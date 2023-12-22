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
    setSelectedEvent({
      title: event.title,
      start: moment(event.start).locale('es').format('LLL'),
      end: moment(event.end).locale('es').format('LLL'),
      cantidadPersonas: event.extendedProps.cantidadPersonas,
    });
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


