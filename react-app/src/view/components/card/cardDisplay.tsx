import SingleCard from  './card.tsx'
import { EventController } from '../../../controller/EventController.ts';
import { UserController } from '../../../controller/UserController.ts';
import { useLocation, useParams } from 'react-router';
import { AuthContext } from '../authContext.tsx';
import { useContext } from 'react'
import { Event } from '../../../model/Event.ts';

export default function DisplayCard() {
  const { pathname } = useLocation();
  const { userId, eventId } = useParams();
  const eventIdInt = Number(eventId);
  const userIdInt = Number(userId);
  const {loggedInUserId} = useContext(AuthContext);
  const userController = new UserController ;
  const eventController = new EventController ;


  if(pathname === '/') {
    const events = eventController.getAllEvents() ;
    return StandardCard(events) ;
  } else if(pathname === `/event/${eventId}`) {
    const events = eventController.getEventById(eventIdInt) ;
    return FullSizeCard(events) ;
  } else if(pathname === `/user/${userId}`){
    if(loggedInUserId === userIdInt ){
      const events = eventController.getUserEvents(loggedInUserId) ;
      return StandardCard(events);
    } else {
      const events = eventController.getUserEvents(userIdInt);
      return StandardCard(events);
    }
  }

  function StandardCard(events: Event[]) {
    return (
      <div className='event-container'>
        <>
          {events.map((event) => {
            const user = userController.getUserById(event.userId) ;
            return (
              <SingleCard key={event.eventId} event={event} user={user}/>
            );
          })}
        </>
      </div>
    );
  }
  
  function FullSizeCard(events: Event[]) {
    return (  
      <div className='event-container'>
        <>
          {events.map((event) => {
            const user = userController.getUserById(event.userId) ;
            return (
              <SingleCard key={event.eventId} event={event} user={user}/>
            );
          })}
        </>
      </div>
    );
  }
}