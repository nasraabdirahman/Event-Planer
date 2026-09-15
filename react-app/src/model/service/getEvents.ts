import type { Event } from "../Events";
import { getEvents } from "../../DB/eventdata";

export function getAllEvents() : Event[] {
    return getEvents();
}