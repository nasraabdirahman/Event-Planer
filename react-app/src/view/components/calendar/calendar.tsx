import { EventCalendar } from '@mui/x-scheduler';
import './calendar.css'
import { EventController } from '../../../controller/EventController';

function Calendar({userId}: {userId: number}) {
  const controller = new EventController ;
  const events = controller.getUserEvents(userId) ;

  const calendarEvents = events.map(events => ({
    id: events.eventId,
    title: events.title,
    start: events.startTimeDate.toISOString(),
    end: events.endTimeDate.toISOString(),
  }));

  return(
    <div className="event-calendar">
      <EventCalendar
        events = {calendarEvents}
        sx={{
          backgroundColor: 'var(--bg)',
          color: 'var(--high-contrast-one)'
        }}
      />
    </div>
    
  )
}
export default Calendar 