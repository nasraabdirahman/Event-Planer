import Button from '@mui/material/Button';
import { useContext} from 'react';
import { AuthContext } from '../context';
import { Link as RouterLink, useLocation} from 'react-router';

export default function CalendarNav() {
  const { pathname } = useLocation();
  const { loggedInUserId } = useContext(AuthContext);

  if ( loggedInUserId === null || pathname === `/calendar/${loggedInUserId}`) {
    return null;
  }

  return (
    <Button
      className='my-calendar-button'
      component={RouterLink}
      to={`/calendar/${loggedInUserId}`}
      variant="contained"
    >
      My Calendar
    </Button>
  );
}
