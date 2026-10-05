import SingleCard from  './card.tsx'
import { useParams } from 'react-router';
import { AuthContext } from '../authContext.tsx';
import { useContext, useEffect, useState  } from 'react'
import  Event  from '../../../interfaces/Event.ts';
import User from '../../../interfaces/User.ts' 

export default function DisplayCard() {
  const { userId, eventId } = useParams();
  const {loggedInUserId} = useContext(AuthContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadEvents(){
      let loadedEvents : Event [];
      if(eventId) {
        console.log("Getting one event");
        const response = await fetch(`/events/getEventById/${eventId}`);
        const events = await response.json();
        loadedEvents = [events] ;
      } else if(userId){
        if(loggedInUserId === userId ){
          console.log("Getting USER events");
          const response = await fetch(`/events/getUserEvents/${loggedInUserId.toString()}`);
          const events = await response.json();
          loadedEvents = events;
        } else {
          console.log("Getting USER events");
          const response = await fetch(`/events/getUserEvents/${userId}`);
          const events = await response.json();
          loadedEvents = events;
        }
      } else {
        const response = await fetch("/events/getAllEvents");
        const events = await response.text();
       loadedEvents = JSON.parse(events);
      }
      const loadUsers = await Promise.all(
        loadedEvents.map(async event => {
          const response = await fetch(`/users/getUser/${event.userId.toString()}`);
          return await response.json();
        })
      );
      setUsers(loadUsers);
      setEvents(loadedEvents);
    }
    loadEvents();
  },[eventId, userId, loggedInUserId]) ;
  
  if(eventId){
    return <FullSizeCard events={events} />;
  }
  return <StandardCard events={events} />

  function StandardCard({ events }: {events: Event[]}) {
    return (
      <div className='event-container'>
        <>
          {events.map((event, index) => {
            return (
              <SingleCard key={event._id?.toString()} event={event} user={users[index]}/>
            );
          })}
        </>
      </div>
    );
  }
  
  function FullSizeCard({ events }: {events: Event[]}) {
    return (  
      <div className='event-container'>
        <>
          {events.map((event, index) => {
            return (
              <SingleCard key={event._id?.toString()} event={event} user={users[index]}/>
            );
          })}
        </>
      </div>
    );
  }
}