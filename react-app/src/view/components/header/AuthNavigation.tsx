import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { MouseEvent } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router';
import User from '../../../interfaces/User';


export default function AuthNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedInUserId, setLoggedInUserId } = useContext(AuthContext);

  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoggedInUserId(null);
    setUser(null);
    handleMenuClose();
    navigate('/');
  };
  const loggedIn = loggedInUserId !== null ;

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    async function loadUser() {
      const response = await fetch(`/users/getUser/${loggedInUserId}`);
      const data: User = await response.json();
      setUser(data);
    }

    loadUser();
  }, [loggedIn, loggedInUserId]);

  if (pathname === '/sign-in' || pathname === '/sign-up') {
    return null;
  }
  return (
    <>
      {!loggedIn && (<Button
        className='sign-in-button'
        component={RouterLink}
        to="/sign-in"
        variant="contained"
      >
        Sign in
      </Button>
      )}
      {loggedIn && (
        <>
          <Button
            onClick={handleMenuOpen}
            startIcon={<AccountCircleIcon />}
            sx={{ color: 'var(--high-contrast-one)' }}
          >
            {user?.username ?? 'My profile'}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              component={RouterLink}
              to={`/user/${loggedInUserId}`}
              onClick={handleMenuClose}
            >
              My profile
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to={`/user/archive/${loggedInUserId}`}
              onClick={handleMenuClose}
            >
              Archive
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Log out
            </MenuItem>
          </Menu>
        </>  
      )}
    </>
  )
}
