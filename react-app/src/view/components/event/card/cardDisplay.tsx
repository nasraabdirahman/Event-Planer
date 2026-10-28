import { SingleCard, FullSizeCard }from  './card.tsx'
import { useParams, useLocation } from 'react-router';
import { useEffect, useState  } from 'react'
import  Event from '../../../../interfaces/Event.ts'
import User from '../../../../interfaces/User.ts';
import Follow from '../../../../interfaces/Follow.ts';

export default function DisplayCard() {
  const { userId, eventId } = useParams();
  const { pathname } = useLocation();
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const archive = pathname === `/user/archive/${userId}` ;

  useEffect(() => {
    async function loadEvents(){
      let loadedEvents : Event [];
      if(eventId) {
        const response = await fetch(`/events/getEventById/${eventId}`);
        const events = await response.json();
        loadedEvents = events ;
      } else if(userId && !archive){
        const followResponse = await fetch(`/follows/getFollowsByUser/${userId}`);
        const follow = await followResponse.json();
        console.log("not main");
        const followEvents = await Promise.all(
          follow.map(async (follow: Follow) => {
            const eventResponse = await fetch(`/events/getEventById/${follow.eventId.toString()}`);
            const event =  await eventResponse.json();
            return event[0];
          })
        );

        const currentFollowedEvents = followEvents.filter(
          (event) => new Date(event.endTimeDate) >= new Date()
        );
        loadedEvents = currentFollowedEvents ;

      } else if (archive) {
        const response = await fetch(`/events/getUserArchivedEvents/${userId}`);
        const events = await response.json();
        loadedEvents = events ;
        console.log(events) ;
      } else {
        const response = await fetch("/events/getAllCurrentEvents");
        const events = await response.json();
        loadedEvents = events ;
        console.log("main");
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
  },[eventId, userId, archive]) ;
  
  if(events.length === 0 || users.length === 0){
    return <p className='text'> Loading... </p>
  }

  if(eventId){
    return renderFullSizeCard ({events});
  }
  if(userId){
    return standardCard ({events})
  }
  return standardCard ({events})

  function standardCard({ events }: {events: Event[]}) {
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
  
  function renderFullSizeCard({ events }: {events: Event[]}) {
    const event = events[0] ;
    return (  
      <div className='event-container'>
        <>
          <FullSizeCard key={event._id?.toString()} event={event} user={users[0]}/>
        </>
      </div>
    );
  }
}