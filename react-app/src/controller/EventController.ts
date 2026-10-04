export class EventController {
  
  async createEvent() {
		const response = await fetch("/createEvent");
		return await response.json();
  }

  async getEventById(eventId : string){
		const response = await fetch(`/getEventById/${eventId}`);
		return await response.json();
  }

  async getAllEvents(){
    const response = await fetch("/getAllEvents");
		return await response.json();
  }
  // Searches for events by title
  async searchEvents(searchText: string) {
		const response = await fetch(`/search/${searchText}`);
		return await response.json();
  }

  async getUserEvents(userId: string){
		const response = await fetch(`/getUserEvents/${userId}`);
		return await response.json();
  }

  async deleteEvent(eventId: string) {
		const response = await fetch(`/deleteEvent/${eventId}`);
		return await response.json();
  }
}