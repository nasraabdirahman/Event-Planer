import { events } from "../../DB/eventdata";
import type { Event } from "../Event";

export class ModelServicesEvent{
  createEvent(event : Event) {
    events.push(event) ;
  }
  getUserEvents(id : number): Event[] {
    return events.filter(events => events.userId === id) ;
  }

  getEventIndex(index : number){
    return events[index];
  }
  getAllEvents() : Event[] {
    return events;
  }
  searchEvents(searchText: string): Event[] {
    return events.filter(event =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
    );
}
  deleteEventIndex(index : number){
    events.splice(index, 1);
  }  
}