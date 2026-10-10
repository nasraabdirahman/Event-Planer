import * as React from 'react'
import './createEditDelete.css'
import { AuthContext } from '../authContext'
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import Event from "../../../interfaces/Event";
import User from "../../../interfaces/User"; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material';

export default function AlterEvent() {
  const { eventId } = useParams();
  const { loggedInUserId } = useContext(AuthContext);
  const [event, setEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);


  useEffect(() =>{
    async function FindEvent(){
      const eventResponse = await fetch(`/events/getEventById/${eventId}`);
      const loadedEvent = await eventResponse.json();
      const currEvent = loadedEvent[0] ;
      console.log('Stored start:', currEvent.startTimeDate);
      console.log('Stored end:', currEvent.endTimeDate);

      console.log('Parsed start:', new Date(currEvent.startTimeDate));
      console.log('Parsed end:', new Date(currEvent.endTimeDate));
      setEvent(currEvent);
      setDescription(currEvent.description);
      setLocation(currEvent.location);
      setPrice(currEvent.price);
      setTitle(currEvent.title);
      setStartDateTime(new Date(currEvent.startDateTime))
      setEndDateTime(new Date(currEvent.endDateTime));
      const userResponse = await fetch(`/users/getUser/${loadedEvent[0].userId}`);
      const loadedUser = await userResponse.json();
      setUser(loadedUser);
    }

  FindEvent();
  },[eventId]);

  async function saveChanges(){
    const updatedEvent = {...event, title, location, description, price,};
    await fetch(`/events/updateEvent/${event?._id}`, {
      method: 'POST',
      headers: {'Content-type': 'application/json',},
      body: JSON.stringify(updatedEvent),
    });
  }

  async function deleteEvent(){
    await fetch(`/events/deleteEvent/${event?._id}`, {
      method: 'DELETE',
    });
  }

  if(!event || !user){
    console.log(event);
    console.log(user);
    return <h2 className="stack-sans-headline-text">Loading...</h2>
  }

  if(!eventId && !loggedInUserId){
    return  <h2 className="stack-sans-headline-text">Error: no valid credentials</h2>
  } else if (loggedInUserId){
    return  <h2 className="stack-sans-headline-text">Create Event</h2>;
  }

  

  return (
    <Box sx={{ minWidth: 275 }} className='edit-event-container' >
      <Card>
        <React.Fragment>
          <CardContent className='card-container'>
            <Link href={`/user/${user._id}`} className='stack-sans-headline-text link' gutterBottom sx={{fontSize: 14 }}>
              {user.username}
            </Link>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <TextField className='stack-sans-headline-text input-title' variant='standard' label='Title: ' value={title} sx={{fontSize: 20}} onChange={(e) => setTitle(e.target.value)} />
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker ampm={false} label="Start Time and Date" value={startDateTime} onChange={(newValue) => setStartDateTime(newValue)}/>
                  <DateTimePicker ampm={false} label="End Time and Date"value={endDateTime} onChange={(newValue) => setEndDateTime(newValue)}/>
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column'}}> 
              <TextField className='stack-sans-headline-text text-two' variant='standard' label='Location: ' value={location} sx={{maxWidth: 500}} onChange={(e) => setLocation(e.target.value)} />
              <TextField className='stack-sans-headline-text text-two' variant='standard' multiline label='Description: ' value={description} onChange={(e) => setDescription(e.target.value)} />
              <TextField className='stack-sans-headline-text text-two' variant='standard' label='Price:  (in kr)' value={price} sx={{maxWidth: 500}} onChange={(e) => setPrice(Number(e.target.value))} />
            </Box>
          </CardContent>
          <CardActions>
            <Button className='stack-sans-headline-text delete' size="large" onClick={deleteEvent}>Delete Event</Button>
            <Button className='stack-sans-headline-text save' size="large" onClick={saveChanges}>Save</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  )
}