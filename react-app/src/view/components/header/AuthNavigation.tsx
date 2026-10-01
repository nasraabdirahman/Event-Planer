import Button from '@mui/material/Button';
import { Link as RouterLink, useLocation } from 'react-router';

export default function AuthNavigation() {
  const { pathname } = useLocation();

  if (pathname === '/sign-in' || pathname === '/sign-up') {
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
