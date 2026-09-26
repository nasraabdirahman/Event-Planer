import Button from '@mui/material/Button';
import { Link as RouterLink, useLocation } from 'react-router';

export default function AuthNavigation() {
  const { pathname } = useLocation();

  if (pathname === '/' || pathname === '/sign-up') {
    return null;
  }

  return (
    <Button
      component={RouterLink}
      to="/"
      variant="contained"
      sx={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1200 }}
    >
      Sign in
    </Button>
  );
}
