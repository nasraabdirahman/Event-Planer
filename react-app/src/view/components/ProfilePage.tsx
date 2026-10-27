import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context";
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

export default function ProfilePage() {
  const { userId } = useParams();
  const { loggedInUserId } = useContext(AuthContext);

  const [ user, setUsers ] =  useState<User | null>(null);
  const [followedEvents, setFollowedEvents] = useState<Event[]>([]);

  useEffect(() => {
    
    // Gets the follows by our user
    async function loadUser(){
      const userResponse = await fetch(`/users/getUser/${userId}`);
      const user = await userResponse.json();
      setUsers(user);

      const followResponse = await fetch(`/follows/getFollowsByUser/${userId}`);
      const follows = await followResponse.json();

      const events = await Promise.all(
      follows.map(async (follow: { eventId: string }) => {
      const response = await fetch(`/events/getEventById/${follow.eventId.toString()}`);
      const event = await response.json();
    return event[0];
  })
);

setFollowedEvents(events);
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
      <Typography
       variant="h3"
       gutterBottom
       className="stack-sans-headline-text"
       sx={{ color: "var(--high-contrast-one)"}}
      >
        {loggedInUserId === userId ? "My Profile" : "Profile"}
      </Typography>

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

     {followedEvents.map((event) => (
  <Card
    key={event._id?.toString()}
    sx={{
      marginBottom: 2,
      backgroundColor: "var(--accent-one)",
      color: "var(--high-contrast-two)",
      borderRadius: "20px",
    }}
  >
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
))}
    </Box>
  );
}

{/* Shows the events the user follows */}