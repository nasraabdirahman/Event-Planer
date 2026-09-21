import { EventCalendar } from '@mui/x-scheduler';
import './calendar.css'
import { EventController } from '../../../controller/EventController';

function Calendar() {
  const controller = new EventController ;
  const events = controller.getAllEvents() ;

  const calendarEvents = events.map(events => ({
    id: events.eventId,
    title: events.title,
    start: events.startTimeDate.toISOString(),
    end: events.endTimeDate.toISOString(),
  }));
  console.log(events);

  return(
    <EventCalendar
      events = {calendarEvents}
      sx={{
        backgroundColor: 'var(--bg)',
        color: 'var(--high-contrast-one)'
      }}
    />
  )
}
export default Calendar 