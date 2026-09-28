import { UserController } from "../../controller/UserController";
import { FollowerController } from "../../controller/FollowerController";
import { EventController } from "../../controller/EventController";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography
} from "@mui/material";
interface ProfilePageProps {
  userId: number;
}

export default function ProfilePage({ userId }: ProfilePageProps) {
  // Creates the user controller
  const userController = new UserController();

  // Creates the follower controller
const followerController = new FollowerController();

// Creates the event controller
const eventController = new EventController();

  // Gets the user by user ID
const user = userController.getUserById(userId);

// Shows a message if the user does not exist
if (!user) {
  return <Typography>User not found</Typography>;
}

  // Gets the events the user follows
const userFollows = followerController.getFollowsByUser(user.userId);

// Gets the events that the user follows
const followedEvents = eventController
  .getAllEvents()
  .filter(event =>
    userFollows.some(follow => follow.eventId === event.eventId)
  );
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

    {/* Shows the events the user follows */}
    {followedEvents.map((event) => (
      <Card key={event.eventId} sx={{ marginBottom: 2 }}>
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