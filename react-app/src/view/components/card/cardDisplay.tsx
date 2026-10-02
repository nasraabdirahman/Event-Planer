import SingleCard from  './card.tsx'
import { EventController } from '../../../controller/EventController.ts';
import { UserController } from '../../../controller/UserController.ts';
export default function DisplayCard() {
  const userController = new UserController ;
  
  const eventController = new EventController ;
  const events = eventController.getAllEvents() ;
  
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