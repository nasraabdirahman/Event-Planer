import { useState } from "react";
import { TextField } from "@mui/material";
import { useLocation } from "react-router";
import { EventController } from "../../controller/EventController";
import type { Event } from "../../model/Event";
export default function SearchBar() {
  const { pathname } = useLocation();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Event[]>([]);
  const controller = new EventController();

  if (pathname === "/" || pathname === "/sign-up") {
    return null;
  }

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
  <div key={event.eventId}>
    <h3>{event.title}</h3>
    <p>{event.location}</p>
  </div>
))}
  </>
);
}
