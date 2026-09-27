import { useState } from "react";
import { TextField, Card, CardContent, Typography } from "@mui/material";
import { EventController } from "../../controller/EventController";
import { UserController } from "../../controller/UserController";
import type { Event } from "../../model/Event";
export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  
  const controller = new EventController();
  const userController = new UserController();

  const creator = selectedEvent
  ? userController.getUserById(selectedEvent.userId)
  : undefined;

  return (
  <>
    <TextField
      label="Search events"
      value={searchText}
      onChange={(event) => {
        const text = event.target.value;
        setSearchText(text);
        setResults(controller.searchEvents(text));
      }}
    />
    {results.map((event) => (
  <div 
    key={event.eventId}
    onClick={() => setSelectedEvent(event)}
    style={{ cursor: "pointer" }}
    >
    <h3>{event.title}</h3>
    <p>{event.location}</p>
  </div>
))}

{selectedEvent && (
  <Card sx={{ maxWidth: 600, marginTop: 2 }}>
    <CardContent>
      <Typography variant="h5">
        {selectedEvent.title}
      </Typography>
          
          
      <Typography variant="body1">
        {selectedEvent.description}
      </Typography>
          
          
      <Typography variant="body1">
        Location: {selectedEvent.location}
      </Typography>
          
          
      <Typography variant="body1">
        Created by: {creator?.username}
      </Typography>
          
          
      <Typography variant="body1">
        Price: {selectedEvent.price} kr
      </Typography>
          
          
      <Typography variant="body1">
        Followers: {selectedEvent.followerCount}
      </Typography>
          
          
      <Typography variant="body1">
        Starts: {selectedEvent.startTimeDate.toLocaleString()}
      </Typography>
          
          
      <Typography variant="body1">
        Ends: {selectedEvent.endTimeDate.toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
  )}
  </>
);
}