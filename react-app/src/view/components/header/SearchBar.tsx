import { useState } from "react";
import { TextField, Card, CardContent, Typography } from "@mui/material";
import Event from "../../../interfaces/Event";
import User from "../../../interfaces/User";
export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [creator, setCreator] = useState<User | null>(null);

  async function loadEvent(text: string){
    const eventResponse = await fetch(`/events/search/${text}`);
    const results = await eventResponse.json();
    setResults(results);
  }
  async function selectEvent(event: Event) {
    setSelectedEvent(event);
    const userResponse = await fetch(`/users/getUser/${event.userId.toString()}`);
    const data = await userResponse.json();
    setCreator(data);
  }
   

  return (
  <>
    <TextField
      label="Search events"
      value={searchText}
      onChange={(event) => {
        const text = event.target.value;
        setSearchText(text);
        loadEvent(text); 
      }}
    />
   
    {results.map((event) => (
  <div 
    key={event._id?.toString()}
    onClick={() => selectEvent(event)}
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
        Starts: {new Date(selectedEvent.startTimeDate).toLocaleString()}
      </Typography>
          
          
      <Typography variant="body1">
        Ends: {new Date(selectedEvent.endTimeDate).toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
  )}
  </>
);
}