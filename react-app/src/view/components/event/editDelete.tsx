import * as React from 'react'
import './editDelete.css'
import { useEffect, useState} from "react"
import { useLocation, useParams, useNavigate } from "react-router"
import Event from "../../../interfaces/Event";
import User from "../../../interfaces/User"; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link'
import { Button, Typography, Dialog } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material';
import { AuthContext } from '../authContext';

export default function AlterEvent() {
  const { eventId} = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedInUserId } = React.useContext(AuthContext)
  const [event, setEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [startTimeDate, setStartTimeDate] = useState<Date | null>(null);
  const [endTimeDate, setEndTimeDate] = useState<Date | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const create = pathname === `/create`;

  useEffect(() =>{
    async function loadData(){
      if(create){
        const userResponse = await fetch(`/users/getUser/${loggedInUserId}`);
        const loadedUser = await userResponse.json();
        setUser(loadedUser);
        return;
      }

      const eventResponse = await fetch(`/events/getEventById/${eventId}`);
      const loadedEvent = await eventResponse.json();
      const currEvent = loadedEvent[0] ;
      setEvent(currEvent);
      setDescription(currEvent.description);
      setLocation(currEvent.location);
      setPrice(currEvent.price);
      setTitle(currEvent.title);
      setFollowerCount(currEvent.followerCount);
      setStartTimeDate(new Date(currEvent.startTimeDate))
      setEndTimeDate(new Date(currEvent.endTimeDate));
      const userResponse = await fetch(`/users/getUser/${loadedEvent[0].userId}`);
      const loadedUser = await userResponse.json();
      setUser(loadedUser);
    }

  loadData();
  },[eventId]);

  async function createEvent(){
    const userId = user?._id;
    const updatedEvent = {...event, userId, title, location, description, followerCount, price, endTimeDate, startTimeDate};
    const response = await fetch(`/events/createEvent`, {
      method: 'POST',
      headers: {'Content-type': 'application/json',},
      body: JSON.stringify(updatedEvent),
    });

    const result: {acknowledged: boolean; insertedId: string} = 
      await response.json();

    navigate(`/event/${result.insertedId}`);
  }

  async function saveChanges(){
    const updatedEvent = {...event, title, location, description, price, endTimeDate, startTimeDate};
    await fetch(`/events/updateEvent/${event?._id}`, {
      method: 'POST',
      headers: {'Content-type': 'application/json',},
      body: JSON.stringify(updatedEvent),
    });
    navigate(`/event/${updatedEvent._id}`);
  }

  async function deleteEvent(){
    await fetch(`/events/deleteEvent/${event?._id}`, {
      method: 'DELETE',
    });
    setDeleteDialog(false);
    navigate(`/user/${event?.userId}`) ;
  }

  if(!user){
    console.log(user);
    return <h2 className="stack-sans-headline-text">Loading...</h2>
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
                  <DateTimePicker ampm={false} label="Start Time and Date" value={startTimeDate} onChange={(newValue) => setStartTimeDate(newValue)}/>
                  <DateTimePicker ampm={false} label="End Time and Date"value={endTimeDate} onChange={(newValue) => setEndTimeDate(newValue)}/>
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
            {!create && (
              <Button className='stack-sans-headline-text delete' size="large" onClick={() => setDeleteDialog(true)}>Delete Event</Button>
            )}
            <Button className='stack-sans-headline-text save' size="large" onClick={create ? createEvent : saveChanges}> {create ? 'Create Event' : 'Save'} </Button>
          </CardActions>
        </React.Fragment>
      </Card>
      <Dialog open={deleteDialog}>
        <Box className='pop-up-event'>
          <Typography variant="h4">
            Are you sure you want to delete: {event?.title} ?
          </Typography>
          <Button className='stack-sans-headline-text save' onClick={() => setDeleteDialog(false)}>
            Close
          </Button>
          <Button className='stack-sans-headline-text delete' onClick={deleteEvent} >
            Delete
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
}