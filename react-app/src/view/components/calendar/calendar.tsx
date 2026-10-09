import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import './calendar.css'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Event from '../../../interfaces/Event';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router' ;
import { Dialog, DialogTitle, DialogActions } from '@mui/material';

function Calendar() {
  const { userId } = useParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<{
    _id: string;
    title: string
  }| null>(null);
  
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
    start: new Date (events.startTimeDate).toISOString(),
    end: new Date (events.endTimeDate).toISOString(),
    description: events.description,
    readOnly: true 
  }));

  return(
    <div className="event-calendar">
      <EventCalendar
        readOnly
        eventCreation={false}
        events = {calendarEvents}
        sx={{
          backgroundColor: 'var(--bg)',
          color: 'var(--high-contrast-one)'
        }}
        onEventEditingStart={(_, eventDetails ) => {
          if(eventDetails.reason !== 'view'){
            return ;
          }
          eventDetails.cancel();
          setSelectedEvent({
            _id: eventDetails.occurrence.id.toString(),
            title: eventDetails.occurrence.title,
          });
        }}
      />
      <Dialog open={selectedEvent !== null} onClose={() => setSelectedEvent(null)}>
        <DialogTitle>
          {selectedEvent?.title}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setSelectedEvent(null)}>
            Close
          </Button>
          {selectedEvent &&(
            <Button component={RouterLink} to={`../event/edit/${selectedEvent._id}`}>
              Edit: {selectedEvent.title}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
    
  )
}
export default Calendar 