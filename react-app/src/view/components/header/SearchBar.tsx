import { useState } from "react";
import { TextField } from "@mui/material";
import Event from "../../../interfaces/Event";
import type User from "../../../interfaces/User";
import { useNavigate } from "react-router";
export default function SearchBar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const [userResults, setUserResults] = useState<User[]>([]);

  async function loadEvent(text: string) {
  if (text.trim() === "") {
    setResults([]);
    return;
  }

  const response = await fetch(
    `/events/search/${encodeURIComponent(text)}`
  );

  if (response.ok) {
    const events: Event[] = await response.json();

    setResults(
      events.filter((event) =>
        event.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  }
}
   async function loadUsers(text: string) {
  if (text.trim() === "") {
    setUserResults([]);
    return;
  }

  const response = await fetch(
    `/users/search/${encodeURIComponent(text)}`
  );

  if (response.ok) {
    const users = await response.json();
    setUserResults(users);
  }
}
  function selectEvent(event: Event) {
    setResults([]);
    setSearchText("");

    if (event._id) {
      navigate(`/event/${event._id.toString()}`);
    }
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
  loadUsers(text);
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

{userResults.map((user) => (
  <div
    key={user._id?.toString()}
    onClick={() => {
      setSearchText("");
      setResults([]);
      setUserResults([]);

      if (user._id) {
        navigate(`/user/${user._id.toString()}`);
      }
    }}
    style={{
      cursor: "pointer",
      padding: "10px 16px",
      backgroundColor: "var(--accent-one)",
      color: "var(--high-contrast-one)",
    }}
  >
    <h3>{user.username}</h3>
    <p>User</p>
  </div>
))}

</div>
</div>
</>
);
}

