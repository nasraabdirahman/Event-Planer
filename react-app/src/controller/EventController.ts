import type { Event } from "../model/Event.ts";
import { ModelServicesEvent } from "../model/service/ServicesEvent.ts";

export class EventController {
  private model: ModelServicesEvent;
  constructor() {
    this.model = new ModelServicesEvent();
  }

  createEvent(event: Event) {
    return this.model.createEvent(event);
  }

  getEventById(eventId : number){
    return this.model.getEventById(eventId) ;
  }

  getEvent(index: number) {
    return this.model.getEventIndex(index);
  }

  getAllEvents() {
    return this.model.getAllEvents();
  }
  // Searches for events by title
  searchEvents(searchText: string) {
    return this.model.searchEvents(searchText);
  }

  getUserEvents(userId: number){
    return this.model.getUserEvents(userId); 
  }
  /*editEvent(event : Event){
    return this.model.getEvent(event) ;
  }*/

  /*deleteEvent(eventId : number) {
    return this.model.deleteEvent(eventId) ;
  }*/

  deleteEvent(index: number) {
    return this.model.deleteEventIndex(index);
  }
}