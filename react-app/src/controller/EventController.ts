import type { Event } from "../model/Event.ts" ;

export class EventController {
  createEvent(event : Event ) {
    return this.model.createEvent(event) ;
  }

  /*getEvent(eventId : number){
    return this.model.getEvent(eventId) ;
  }*/

  getEvent(index :number) {
    return this.model.getEventIndex(index) ;
  }

  editEvent(event : Event){
    return this.model.getEvent(event) ;
  }

  /*deleteEvent(eventId : number) {
    return this.model.deleteEvent(eventId) ;
  }*/

  deleteEvent(index :number) {
    return this.model.deleteEventIndex(index) ;
  }
}