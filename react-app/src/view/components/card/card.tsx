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
import { Event } from '../../../model/Event';
import { User } from '../../../model/Users'

type SingleCardProps = {
  event: Event ;
  user: User ;
};

export default function SingleCard({event, user}: SingleCardProps) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        <React.Fragment>
          <CardContent>
            <Link href={`/user/${user.userId}`} className='stack-sans-headline-text link' gutterBottom sx={{fontSize: 14 }}>
              {user.username}
            </Link>
            <Typography className='stack-sans-headline-text text' variant="h3" component="div">
              {event.title}
            </Typography>
            <Typography className='stack-sans-headline-text text-two' sx={{ mb: 1.5 }}>
              {event.location} </Typography>
            <Typography className='stack-sans-headline-text text-two' >
              {event.description}</Typography>
          </CardContent>
          <CardActions>
            <Button component={RouterLink} to={`/${event.eventId}`} className='stack-sans-headline-text learn-more' size="small">Learn More</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  )
};
    
