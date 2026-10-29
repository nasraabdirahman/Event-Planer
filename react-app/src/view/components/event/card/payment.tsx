import { useContext, useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { AuthContext } from "../../context";
import type Event from "../../../../interfaces/Event";

type JoinEventProps = {
    event: Event;
    onJoined: () => void | Promise<void>;
};

export default function JoinEvent({ event, onJoined }: JoinEventProps) {
    const { loggedInUserId } = useContext(AuthContext);

    const [joining, setJoining] = useState(false);
    const [joinError, setJoinError] = useState("");

    const eventId = event._id?.toString();

    const isOwner = loggedInUserId === event.userId.toString();

    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("sessionId");
    const payment = params.get("payment");

    if (payment !== "success" || !sessionId || !eventId) {
        return;
    }

    let active = true;

    async function confirmPayment(id: string) {
        setJoining(true);
        setJoinError("");
        try {
            const response = await fetch(
                `/joins/confirm/${encodeURIComponent(id)}`,
                { method: "POST" }
            );

            if (!response.ok) {
                throw new Error(await response.text());
            }
            const result: {status: "joined" | "already_processed";} = await response.json();
            if (!active) return;
            if (result.status === "joined" ||result.status === "already_processed") {await onJoined();
                if (active) {window.history.replaceState({},"",window.location.pathname);}} 
            else {
                throw new Error("Unexpected payment status");
            }
        } 
        catch (error) {console.error("Klarna confirmation error:", error);
            if (active) {
                setJoinError("Could not confirm Klarna payment.");
            }
        } 
        finally {
            if (active) {setJoining(false);}
        }
    }
    void confirmPayment(sessionId);
    return () => {
        active = false;
    };
}, [eventId, onJoined]);

    async function handleJoin() {
        if (!loggedInUserId || !eventId) {
            setJoinError("Please sign in to join this event.");
            return;
        }
        if (isOwner) {
            setJoinError("You cannot join your own event.");
            return;
        }
        setJoining(true);
        setJoinError("");
        try {
            const response = await fetch("/joins/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    eventId,
                    userId: loggedInUserId
                })
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const result: {status: "joined" | "already_joined" | "payment_required"; redirectUrl?: string;} = await response.json();
            if (result.status === "payment_required" && result.redirectUrl) {
                window.location.assign(result.redirectUrl);
            }
            else if (result.status === "joined") 
            {
                await onJoined(); 
            }
            else if (result.status === "already_joined") {
                setJoinError("You have already joined this event.");
            }
            else {
                throw new Error("Unexpected join response");
            }
        } 
        catch (error) {
            console.error(error);
            setJoinError("Could not join the event.");
        } 
        finally {
            setJoining(false);
        }
    }
    return (
        <Box>
            {!isOwner && (
                <Button
                    className="stack-sans-headline-text comments-join"
                    size="large"
                    onClick={() => void handleJoin()}
                    disabled={joining}
                >
                    {joining ? "Processing..." : "Join"}
                </Button>
            )}

            {joinError && (
                <Typography color="error" variant="body2">
                    {joinError}
                </Typography>
            )}
        </Box>
    );
}