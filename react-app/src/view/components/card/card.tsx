import * as React from 'react';
import { Link as RouterLink}  from 'react-router' ;
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './card.css'
import  Event  from '../../../interfaces/Event';
import  User  from '../../../interfaces/User';
import { CardHeader } from '@mui/material';

type SingleCardProps = {
  event: Event ;
  user: User ;
};

export function SingleCard({event, user}: SingleCardProps) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Link href={`/user/${user._id}`} className='stack-sans-headline-text link' gutterBottom sx={{fontSize: 14 }}>
              {user.username}
            </Link>
            <Typography className='stack-sans-headline-text text' variant="h3" component="div">
              {event.title}
            </Typography>
            <Typography className='stack-sans-headline-text text-two' sx={{ mb: 1.5 }}>
              {event.location} </Typography>
            <Typography className='stack-sans-headline-text text-two' >
              {event.description}</Typography>
            <Typography className='stack-sans-headline-text text-two' >
              Price: {event.price} kr </Typography>
          </CardContent>
          <CardActions>
            <Button component={RouterLink} to={`/event/${event._id}`} className='stack-sans-headline-text learn-more' size="small">Learn More</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  )
};

export function FullSizeCard({event, user}: SingleCardProps) {
  const startDate = new Date(event.startTimeDate);
  const endDate = new Date(event.endTimeDate);
  const formattedStartDate = startDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  const formattedStartTime = startDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedEndDate = endDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  const formattedEndTime = endDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <React.Fragment>
          <CardContent className='card-container'>
            <Link href={`/user/${user._id}`} className='stack-sans-headline-text link' gutterBottom sx={{fontSize: 14 }}>
              {user.username}
            </Link>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Typography className='stack-sans-headline-text text' variant="h3" component="div">
                {event.title}
              </Typography>
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography className='stack-sans-headline-text dates'>
                  Starts at: {formattedStartTime} the {formattedStartDate}
                </Typography>
                <Typography className='stack-sans-headline-text dates'>
                  Ends at: {formattedEndTime} the {formattedEndDate}
                </Typography>
              </Box>
            </Box>
            <Typography className='stack-sans-headline-text text-two' sx={{ mb: 1.5 }}>
              {event.location} </Typography>
            <Typography className='stack-sans-headline-text text-two' >
              {event.description}</Typography>
             <Typography className='stack-sans-headline-text text-two' >
              Price: {event.price} kr </Typography>
          </CardContent>
          <CardActions>
            <Button className='stack-sans-headline-text comments-join' size="large">Comments</Button>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <Button className='stack-sans-headline-text comments-join' size="large">Join</Button>
              <Typography className='stack-sans-headline-text follows' > {event.followerCount}</Typography>
            </Box>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  )
};