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
}