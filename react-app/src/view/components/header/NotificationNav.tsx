import { useContext, useEffect, useState, type MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router';
import { AuthContext } from '../context';
import type Event from '../../../interfaces/Event';

export default function NotificationNav() {
  const { loggedInUserId } = useContext(AuthContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [openButton, setOpenButton] = useState<HTMLElement | null>(null);

  useEffect(() => {
  if (!loggedInUserId) {
    return;
  }

  async function loadNotifications() {
    try {
      const response = await fetch( `/notifications/getUpcomingNotifications/${loggedInUserId}` );
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const upcomingEvents: Event[] =
        await response.json();

      setEvents(upcomingEvents);
    } catch (error) {console.error('Notifications lod error',error );
      setEvents([]);
    }
  }

  loadNotifications();
}, [loggedInUserId]);

if (!loggedInUserId) {
  return null;
}

const openMenu = (event: MouseEvent<HTMLElement>) => {
  setOpenButton(event.currentTarget);
};

const closeMenu = () => {
  setOpenButton(null);
};
  return (
  <>
    <IconButton
      aria-label="Notifications"
      onClick={openMenu}
      sx={{ color: 'var(--high-contrast-one)' }}
    >
      <Badge color="warning" variant="dot" invisible={events.length === 0}>
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <Menu
      anchorEl={openButton}
      open={!!openButton}
      onClose={closeMenu}
    >
      {events.length === 0 ? (
        <MenuItem disabled>No upcoming events soon</MenuItem>
      ) : (
        events.map(ev => (
          <MenuItem
            key={ev._id?.toString()}
            component={RouterLink}
            to={`/event/${ev._id}`}
            onClick={closeMenu}
          >
            Reminder: {ev.title} at{' '}
            {new Date(ev.startTimeDate).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit',})}
          </MenuItem>
        ))
      )}
    </Menu>
  </>
);
}