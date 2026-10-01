import Button from '@mui/material/Button';
import { useContext} from 'react';
import { AuthContext } from '../authContext';
import { Link as RouterLink, useLocation } from 'react-router';

export default function AuthNavigation() {
  const { pathname } = useLocation();
  const { loggedInUserId } = useContext(AuthContext);

  if (pathname === '/sign-in' || pathname === '/sign-up' || loggedInUserId !== null) {
    return null;
  }

  return (
    <Button
      className='sign-in-button'
      component={RouterLink}
      to="/sign-in"
      variant="contained"
    >
      Sign in
    </Button>
  );
}
