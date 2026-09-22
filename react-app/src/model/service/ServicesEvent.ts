import { events } from "../../DB/eventdata";
import type { Event } from "../Event";

export class ModelServicesEvent{
  createEvent(event : Event) {
    events.push(event) ;
  }

  getEventIndex(index : number){
    return events[index];
  }
  getAllEvents() : Event[] {
    return events;
  }
  deleteEventIndex(index : number){
    events.splice(index, 1);
  } 
  
  getEventPrice(eventId : number)
  {
    //for each eventid inside events find the matching one
    const eventid = events.find(eventid => eventid.eventId === eventId);

    if(eventid)
    {
      return eventid.price;
    }
  }
  getEventById(eventId : number)
  {
    return events.find(event => event.eventId === eventId);
  }
}