import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link as RouterLink,useNavigate } from 'react-router';
import AppTheme from '../shared-theme/AppTheme.tsx';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100dvh',
  height: 'auto',
  overflowY: 'auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [userNameError, setUserNameError] = React.useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = React.useState('');
  const [ageError, setAgeError] = React.useState(false);
  const [ageErrorMessage, setAgeErrorMessage] = React.useState('');
  const [interestError, setInterestError] = React.useState(false);
  const [interestErrorMessage, setInterestErrorMessage] = React.useState('');
  const [submitMessage, setSubmitMessage] = React.useState('');
  const navigate = useNavigate();
  

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const username = document.getElementById('username') as HTMLInputElement;
    const age = document.getElementById('age') as HTMLInputElement;
    const selectedInterest = document.querySelector('input[name="interest"]:checked') as HTMLInputElement | null;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!username.value || username.value.length < 1) {
      setUserNameError(true);
      setUserNameErrorMessage('UserName is required');
      isValid = false;
    } else {
      setUserNameError(false);
      setUserNameErrorMessage('');
    }
    if (!age.value || Number(age.value) < 1 || Number(age.value) >= 99) {
      setAgeError(true);
      setAgeErrorMessage('Enter a valid age');
      isValid = false;
    } else {
      setAgeError(false);
      setAgeErrorMessage('');
    }
    

    if (!selectedInterest) {
      setInterestError(true);
      setInterestErrorMessage('Select at least one intresset');
      isValid = false;
    } else {
      setInterestError(false);
      setInterestErrorMessage('');
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!validateInputs()) { return ; }
    const data = new FormData(event.currentTarget);
    const user = {
    username: data.get('username') as string,
    age: Number(data.get('age')),
    email: data.get('email') as string,
    password: data.get('password') as string,
    interest: data.getAll('interest').map(String),
  };
  try {
  const response = await fetch('/users/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
    });
  if (!response.ok){
    const result = await response.json();
    setSubmitMessage(result.message);
    return
  }
    navigate('/sign-in');
    } catch {
    setSubmitMessage('Failed connecting to the server');
    }
  };
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" sx={{ justifyContent: 'space-between' }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="username">User name</FormLabel>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                placeholder="username"
                error={userNameError}
                helperText={userNameErrorMessage}
                color={userNameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="age">Age</FormLabel>
            <TextField
              required
              fullWidth
              id="age"
              name="age"
              type="number"
              placeholder="23"
              error={ageError}
              helperText={ageErrorMessage}
              color={ageError ? 'error' : 'primary'}
              />
              </FormControl>
            
            <FormControl>
            <FormLabel>Interests</FormLabel>
            <FormGroup row>
            <FormControlLabel
            control={<Checkbox name="interest" value="Competition" color="primary" />}
              label="Competition"
            />
            <FormControlLabel
              control={<Checkbox name="interest" value="Gaming" color="primary" />}
              label="Gaming"
            />
            <FormControlLabel
              control={<Checkbox name="interest" value="Music" color="primary" />}
              label="Music"
            />
            <FormControlLabel
              control={<Checkbox name="interest" value="Sport" color="primary" />}
              label="Sport"
            />
            </FormGroup>
            {interestError && (
              <FormHelperText error >{interestErrorMessage}</FormHelperText>)}
              </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
            {submitMessage && (
            <Typography color="error" sx={{textAlign:'center'}}>
            {submitMessage}
            </Typography>
          )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/sign-in"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
