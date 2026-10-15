import { useState } from "react";
import { TextField, CardContent, Typography, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
    setResults([]);
    const userResponse = await fetch(`/users/getUser/${event.userId.toString()}`);
    const data = await userResponse.json();
    setCreator(data);
  }
   

  return (
  <>
  <div style={{ position: "relative" }}>
    <TextField
      label="Search events"
      sx={{
    "& .MuiOutlinedInput-root": {
      color: "var(--high-contrast-one)",
      backgroundColor: "var(--bg)",
      "& input": {
      color: "var(--high-contrast-one)",
      WebkitTextFillColor: "var(--high-contrast-one)",
  },
},
    "& .MuiInputLabel-root": {
      color: "var(--high-contrast-one)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--high-contrast-one)",
    },
  }}
      value={searchText}
      onChange={(event) => {
        const text = event.target.value;
        setSearchText(text);
        loadEvent(text); 
      }}
    />
   
  <div style={{
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  zIndex: 20,
  maxHeight: "300px",
  overflowY: "auto",
  backgroundColor: "var(--accent-one)",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
}}>
    {results.map((event) => (
  <div 
    key={event._id?.toString()}
    onClick={() => selectEvent(event)}
    style={{
       cursor: "pointer",
       color: "var(--high-contrast-two)",
       fontFamily: '"Stack Sans Headline", sans-serif',
       backgroundColor: "var(--accent-one)",
       borderRadius: "12px",
       padding: "10px 16px",

    }}
  >
    <h3 style={{
  color: "var(--high-contrast-one)",
  margin: "0 0 6px 0",
}}>
  {event.title}
</h3>

<p style={{
  color: "var(--high-contrast-two)",
  margin: 0,
}}>
  {event.location}
</p>
  </div>
))}
</div>
</div>

  {selectedEvent && (
  <Dialog
    open={Boolean(selectedEvent)}
    onClose={() => setSelectedEvent(null)}
    maxWidth="sm"
    fullWidth
    slotProps={{
      paper: {
        sx: {
          backgroundColor: "var(--accent-one)",
          color: "var(--high-contrast-two)",
          borderRadius: "20px",
          padding: "10px",

        },
      },
    }}
  >
    <CardContent>
      <Typography
        variant="h5"
        className="stack-sans-headline-text"
        sx={{
          color: "var(--high-contrast-one)",
          marginBottom: 2,
        }} 
      >
        {selectedEvent.title}
      </Typography>
          
          
      <Typography
       variant="body1"
       className="stack-sans-headline-text"
       sx={{
         color: "var(--high-contrast-two)",
         marginBottom: 2,
       }}
    >

        {selectedEvent.description}
      </Typography>
          
          
      <Typography
       variant="body1"
       className="stack-sans-headline-text"
       sx={{
         color: "var(--high-contrast-two)",
         marginBottom: 1,
      }}
    >
        Location: {selectedEvent.location}
      </Typography>
          
          
      <Typography
       variant="body1"
       className="stack-sans-headline-text"
       sx={{
        color: "var(--high-contrast-two)",
        marginBottom: 1,
      }}
    >
        Created by: {creator?.username}
      </Typography>
          
          
      <Typography
       variant="body1"
       className="stack-sans-headline-text"
       sx={{
        color: "var(--high-contrast-two)",
        marginBottom: 1,
      }}
    >
        Price: {selectedEvent.price} kr
      </Typography>
          
          
      <Typography
       variant="body1"
       className="stack-sans-headline-text"
       sx={{
         color: "var(--high-contrast-two)",
         marginBottom: 1,
       }}
    >
        Followers: {selectedEvent.followerCount}
      </Typography>
          
          
      <Typography
       variant="body1"
       className="stack-sans-headline-text"
       sx={{
         color: "var(--high-contrast-two)",
         marginBottom: 1,
       }}
    >
        Starts: {new Date(selectedEvent.startTimeDate).toLocaleString()}
      </Typography>
          
          
      <Typography
       variant="body1"
       className="stack-sans-headline-text"
       sx={{
         color: "var(--high-contrast-two)",
         marginBottom: 1,
      }}
  >
        Ends: {new Date(selectedEvent.endTimeDate).toLocaleString()}
      </Typography>
      <IconButton
  onClick={() => setSelectedEvent(null)}
  aria-label="Close event details"
  sx={{
    position: "absolute",
    top: 12,
    right: 12,
    color: "var(--high-contrast-one)",
  }}
>
  <CloseIcon />
</IconButton>
    </CardContent>
  </Dialog>
  )}
  </>
);
}