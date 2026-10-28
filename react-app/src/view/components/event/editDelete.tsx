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
import { Button, Typography, Dialog, FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, FormHelperText } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TextField } from '@mui/material';
import { AuthContext } from '../context.tsx' ;
import { eventInputValidation, EventError } from './eventValidation';
import CloseIcon from '@mui/icons-material/Close';

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
  const [interest, setInterest] = useState<string[]>([]); 
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [error, setError] = useState<EventError | null>(null);
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
      setInterest(currEvent.interest);
      setStartTimeDate(new Date(currEvent.startTimeDate))
      setEndTimeDate(new Date(currEvent.endTimeDate));
      const userResponse = await fetch(`/users/getUser/${loadedEvent[0].userId}`);
      const loadedUser = await userResponse.json();
      setUser(loadedUser);
    }

  loadData();
  },[eventId, loggedInUserId, create]);

  async function createEvent(){
    if(!checkForm()){
      return;
    }
    const userId = user?._id;
    const updatedEvent = {...event, userId, title, location, description, followerCount, price, interest, endTimeDate, startTimeDate};    

    const response = await fetch(`/events/createEvent`, {
      method: 'POST',
      headers: {'Content-type': 'application/json',},
      body: JSON.stringify(updatedEvent),
    });

    const result: {acknowledged: boolean; insertedId: string} = 
      await response.json();

    await fetch(`/follows/createFollow`, {
      method: 'POST',
      headers: {'Content-type': 'application/json',},
      body: JSON.stringify({eventId: result.insertedId, userId, notifcations: true}),
    });

    navigate(`/event/${result.insertedId}`);
  }

  async function saveChanges(){
    if(!checkForm()){
      return;
    }
    console.log(interest);
    const updatedEvent = {...event, title, location, description, price, interest, endTimeDate, startTimeDate};
    await fetch(`/events/updateEvent/${event?._id}`, {
      method: 'PUT',
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

  function checkForm(): boolean {

    const validationErrors = eventInputValidation({
      title,
      location,
      description,
      price,
      interest,
      startTimeDate,
      endTimeDate,
    });

    setError(validationErrors);
    return validationErrors.count === 0;
  }

  if(!user){
    return <h2 className="stack-sans-headline-text">Loading...</h2>
  }
  if(create) {
    if(user._id!.toString() !== loggedInUserId){
      navigate(`/profilePage/${user._id}`)
    }
  }
    

  return (
    <Box sx={{ minWidth: 275 }}  className='edit-event-container'>
      <FormControl className='full-size'>
        <Card>
          <React.Fragment>
            <CardContent className='card-container'>
              <Link href={`/user/${user._id}`} className='stack-sans-headline-text link' gutterBottom sx={{fontSize: 14 }}>
                {user.username}
              </Link>
              <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <TextField className='stack-sans-headline-text input-title' variant='standard' label='Title: ' value={title} sx={{fontSize: 20}} onChange={(e) => setTitle(e.target.value)} error={Boolean(error?.titleError)} 
                helperText={error?.titleError} slotProps={{htmlInput: {maxLength: 40}}}/>
                <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker ampm={false} label="Start Time and Date" value={startTimeDate} onChange={(newValue) => setStartTimeDate(newValue)} 
                      slotProps={{textField: {
                        error: Boolean(error?.startTimeDateError),
                        helperText: error?.startTimeDateError
                      }}}
                      sx={{zIndex: 0}}/>
                    <DateTimePicker ampm={false} label="End Time and Date" value={endTimeDate} onChange={(newValue) => setEndTimeDate(newValue)}
                      slotProps={{textField: {
                        error: Boolean(error?.endTimeDateError),
                        helperText: error?.endTimeDateError
                      }}}
                      sx={{zIndex: 0}}/>
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box sx={{display:'flex', flexDirection:'column'}}> 
                <TextField className='stack-sans-headline-text text-two' variant='standard' label='Location: ' error={Boolean(error?.locationError)} helperText={error?.locationError} value={location} sx={{maxWidth: 500}} onChange={(e) => setLocation(e.target.value)} slotProps={{htmlInput: {maxLength: 40}}}/>
                <TextField className='stack-sans-headline-text text-two' variant='standard' multiline label='Description: ' error={Boolean(error?.descriptionError)} helperText={error?.descriptionError} value={description} onChange={(e) => setDescription(e.target.value)} slotProps={{htmlInput: {maxLength: 200}}}/>
                <TextField className='stack-sans-headline-text text-two' variant='standard' label='Price:  (in kr)' error={Boolean(error?.priceError)} helperText={error?.priceError} value={price} sx={{maxWidth: 500}} onChange={(e) => setPrice(Number(e.target.value))} slotProps={{htmlInput: {maxLength: 4}}}/>
              </Box>
              <FormControl error={Boolean(error?.interestError)}>
              <FormLabel>Interests</FormLabel>
              <FormGroup row>
                {['Sport', 'Music', 'Competition', 'Gaming', 'Comedy'].map((item) => (
                  <FormControlLabel key={item} label={item}  control={
                    <Checkbox name='interest' value={item}  checked={interest.includes(item)}  
                      onChange={() => setInterest((prev) => prev.includes(item) 
                        ? prev.filter((i) => i !== item) 
                        : [...prev, item])} />
                  } />
                ))}
              </FormGroup>
              {Boolean(error?.interestError) && (
                <FormHelperText>{error?.interestError}</FormHelperText>
              )}
            </FormControl>
            </CardContent>
            <CardActions>
              {!create && (
                <Button className='stack-sans-headline-text delete' size="large" onClick={() => setDeleteDialog(true)}>Delete Event</Button>
              )}
              <Button className='stack-sans-headline-text save' size="large" onClick={create ? createEvent : saveChanges}> {create ? 'Create Event' : 'Save'} </Button>
              
              {!create &&(
                <Button className='stack-sans-headline-text edit' size='large' onClick={() => navigate(`/event/${event?._id}`)}> Cancel </Button>
              )}
              {create &&(
                <Button className='stack-sans-headline-text edit' size='large' onClick={() => navigate(`/user/${user?._id}`)}> Cancel </Button>
              )}
            </CardActions>
          </React.Fragment>
        </Card>
      </FormControl>
      <Dialog open={deleteDialog}>
        <Box className='pop-up-event-delete'>
          <Box className='pop-up-centered' >
            <Typography variant="h4">
              Delete: {event?.title} ?
            </Typography>
            <CloseIcon fontSize='large' sx={{padding: 1 }} onClick={() => setDeleteDialog(false)} cursor='pointer' />
          </Box>
          <Button className='stack-sans-headline-text delete-dialog'  onClick={deleteEvent} >
            Delete
          </Button>
        </Box>
      </Dialog>
    </Box>
  )
}