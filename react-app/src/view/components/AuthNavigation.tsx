import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router';

export default function AuthNavigation() {
  return (
    <Button
      component={RouterLink}
      to="/sign-in"
      variant="contained"
      sx={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1200 }}
    >
      Sign in
    </Button>
  );
}
