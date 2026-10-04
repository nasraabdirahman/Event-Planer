import SingleCard from  './card.tsx'
import { EventController } from '../../../controller/EventController.ts';
import { UserController } from '../../../controller/UserController.ts';
import { useParams } from 'react-router';
import { AuthContext } from '../authContext.tsx';
import { useContext, useEffect, useState  } from 'react'
import  Event  from '../../../model/Event.ts';

const eventController = new EventController ;
const userController = new UserController ;

export default function DisplayCard() {
  const { userId, eventId } = useParams();
  const userIdInt = Number(userId);
  const {loggedInUserId} = useContext(AuthContext);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents(){
      if(eventId) {
        const event = await eventController.getEventById(eventId) ;
        setEvents([event]) ;
      } else if(userId){
        if(loggedInUserId === userIdInt ){
          const events = await eventController.getUserEvents(loggedInUserId.toString()) ;
          setEvents(events);
        } else {
          const events = await eventController.getUserEvents(userId);
          setEvents(events);
        }
      } else {
        const events = await eventController.getAllEvents() ;
        setEvents(events);
      }
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
          {events.map((event) => {
            const user = await userController.getUserById(event.userId) ;
            return (
              <SingleCard key={event._id?.toString()} event={event} user={user}/>
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
          {events.map((event) => {
            const user = userController.getUserById(event.userId) ;
            return (
              <SingleCard key={event._id?.toString()} event={event} user={user}/>
            );
          })}
        </>
      </div>
    );
  }
}