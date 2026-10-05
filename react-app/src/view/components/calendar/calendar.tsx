import { EventCalendar } from '@mui/x-scheduler';
import './calendar.css'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Event from '../../../interfaces/Event';

function Calendar() {
  const { userId } = useParams();
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect (() => {
    async function loadInfo(){
        const response = await fetch(`/events/getUserEvents/${userId}`);
        const data =  await response.json();
        setEvents(data); 
    }
    if(userId){
      loadInfo();
    }
  }, [userId]);
  

  const calendarEvents = events.map(events => ({
    id: events._id,
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