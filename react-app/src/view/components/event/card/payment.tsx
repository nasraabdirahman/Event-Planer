import { useContext, useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../../context";
import type Event from "../../../../interfaces/Event";

export default function JoinEvent({event}: {event:Event})
{
    const {loggedInUserId} = useContext(AuthContext);
    const [joining, setJoining] = useState(false)
    const [joinError, setJoinError] = useState("")
    const eventId = event._id?.toString();

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get("sessionId")
        let active = true
        async function confirmPayment()
        {
            if(!sessionId || !eventId) return;
            setJoining(true)
            try {
                const response = await fetch(`/joins/confirm/${encodeURIComponent(sessionId)}`, {
                    method: "POST"
                })

                if(!response.ok)
                {
                    throw new Error("Payment confirmation failed")
                }

                const result: {status: string} = await response.json();

                if(active && result.status === "joined")
                {
                    window.history.replaceState({}, "", window.location.pathname)
                    window.location.reload()
                }
            }
            catch(error)
            {
                console.error(error)
                if(active)
                {
                    setJoinError("Could not confirm Klarna payment.");
                }
            }
            finally
            {
                if(active)
                {
                    setJoining(false)
                }
            }
        }

        void confirmPayment();

        return () => {
            active = false;
        };
    }, [eventId])
    async function handleJoin()
    {
        if(!loggedInUserId || !event._id)
        {
            setJoinError("Please Sign in to join this event.")
            return;
        }

        setJoining(true)
        setJoinError("")
        try{
            const response = await fetch("/joins/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId: event._id.toString(),
                    userId: loggedInUserId
                })
            });
            if(!response.ok)
            {
                const message = await response.text();
                throw new Error(message);
            }

            const result: {
                status: "joined" | "payment_required";
                redirectUrl?: string;
            } = await response.json();

            if(result.status === "payment_required" && result.redirectUrl)
            {
                //redirect to the payment page
                window.location.assign(result.redirectUrl);
            }
            else if(result.status === "joined")
            {
                window.location.reload()
            }
            else
            {
                throw new Error("Unexpected join response")
            }
        }
        catch(error)
        {
            console.log(error)
            setJoinError("Could not join the event.")
        }
        finally
        {
            setJoining(false)
        }
    }
    return (
        <Box>
            <Button className="stack-sans-headline-text comments-join" size="large" onClick={() => void handleJoin()} disabled={joining}>
                {joining ? "Processing..." : "Join"}
            </Button>
            {joinError && (
                <Typography color="error" variant="body2">
                    {joinError}
                </Typography>
            )}
        </Box>
    );
}