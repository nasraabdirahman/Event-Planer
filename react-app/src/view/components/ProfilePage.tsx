import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Button
} from "@mui/material";
import { useEffect, useState } from "react";
import User from "../../interfaces/User";


export default function ProfilePage() {
  const { userId } = useParams();
  const { loggedInUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [ user, setUsers ] =  useState<User | null>(null);
  

  useEffect(() => {
    
    // Gets the follows by our user
    async function loadUser(){
      const userResponse = await fetch(`/users/getUser/${userId}`);
      const user = await userResponse.json();
      setUsers(user);

      
    }
    loadUser();
  }, [userId]) ;

   // Shows a message if the user does not exist
  if(!userId) {
    return <Typography>User not found</Typography>;
  }
  if(!user){
    return <Typography>Loading...</Typography>;
  }
   
  return (
    <Box sx={{ maxWidth: 800, margin: "40px auto", padding: 2 }}>
      {/* Shows the user's profile information */}
      <Box  sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Typography
        variant="h3"
        gutterBottom
        className="stack-sans-headline-text"
        sx={{ color: "var(--high-contrast-one)"}}
        >
          {loggedInUserId === userId ? "My Profile" : "Profile"}
        </Typography>
        <Button className="stack-sans-headline-text create" onClick={() => navigate('/create')}>
          Create
        </Button>
      </Box>
      <Card 
        sx={{ 
          marginBottom: 4,
          backgroundColor: "var(--accent-one)",
          color: "var(--high-contrast-two)",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <CardContent>
          <Typography
           variant="h4"
           className= "stack-sans-headline-text"
           sx={{
            color: "var(--high-contrast-one)",
            marginBottom: 2,

           }}
          >
            {user.username}
          </Typography>

          <Typography
            className= "stack-sans-headline-text"
            sx={{ color: "var(--high-contrast-two)" }}
          >
          Email: {user.email}
          </Typography>


          <Typography
            className="stack-sans-headline-text"
            sx={{ color: "var(--high-contrast-two)" }}
          >
            Age: {user.age}
          </Typography>

          <Typography
            variant= "h6"
            className="stack-sans-headline-text"
             sx={{
              color: "var(--high-contrast-one)",
              marginTop: 2,
              marginBottom: 1, 
            }}
          >
            Interests
          </Typography>

          {user.interest.map((interest) => (
            <Chip
              key={interest}
              label={interest}
              sx={{ marginRight: 1,
                    marginBottom: 1,
                    backgroundColor: "var(--accent-two)",
                    color: "var(--high-contrast-two)",
                    borderRadius: "10px",
                    fontFamily: '"Stack Sans Headline", sans-serif',
               }}
            />
          ))}
        </CardContent>
      </Card>

      <Typography
        variant="h4"
        gutterBottom
        className="stack-sans-headline-text"
        sx={{
         color: "var(--high-contrast-one)",
         marginTop: 3,
         marginBottom: 2,
      }}
   > 
    Followed Events
   </Typography>

    
    </Box>
  );
}

{/* Shows the events the user follows */}