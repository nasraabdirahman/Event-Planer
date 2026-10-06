import { useParams } from "react-router";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import User from "../../interfaces/User";
import Event from "../../interfaces/Event";
import Follow from "../../interfaces/Follow";


export default function ProfilePage() {
  const { userId } = useParams();
  const [ user, setUsers ] =  useState<User | null>(null);
  const [ event, setEvent ] =  useState<Event[]>([]);

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
      <Typography variant="h3" gutterBottom sx={{ color: "white" }}>
        Profile
      </Typography>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h4">
            {user.username}
          </Typography>

          <Typography>Email: {user.email}</Typography>
          <Typography>Age: {user.age}</Typography>

          <Typography sx={{ marginTop: 2, marginBottom: 1 }}>
            Interests
          </Typography>

          {user.interest.map((interest) => (
            <Chip
              key={interest}
              label={interest}
              sx={{ marginRight: 1 }}
            />
          ))}
        </CardContent>
      </Card>

      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Followed Events
      </Typography>

      {/*
      {event.map((event) => (
        <Card key={event._id?.toString()} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">
              {event.title}
            </Typography>

            <Typography>
              Location: {event.location}
            </Typography>

            <Typography>
              Price: {event.price} SEK
            </Typography>
          </CardContent>
        </Card>
      ))}*/}
    </Box>
  );
}

{/* Shows the events the user follows */}