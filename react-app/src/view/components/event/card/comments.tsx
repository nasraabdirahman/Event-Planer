import { useContext, useEffect, useState } from "react";
import type Comment from "../../../../interfaces/Comment";
import { Button, TextField, Typography, Box } from "@mui/material";
import { AuthContext } from "../../context";

export default function Comments({
    eventId,
    showInput
}: {
    eventId: string;
    showInput: boolean;
}) {
    const { loggedInUserId } = useContext(AuthContext);

    const [comments, setComments] = useState<
        (Comment & { username: string })[]
    >([]);
    const [commentData, setCommentData] = useState("");
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        let active = true;

        async function loadComments() {
            try {
                const response = await fetch(
                    `/Comment/getAllComments/${eventId}`
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch comments: ${response.status}`
                    );
                }
                const data: (Comment & { username: string })[] = await response.json();
                console.log("First comment:", data[0]);
                console.log("Username:", data[0]?.username);
                console.log("User ID:", data[0]?.userid);
                if (active) {
                    setComments(data);
                    setError("");
                }
            } catch (error) {
                console.error(error);

                if (active) {
                    setError("Could not load comments");
                }
            }
        }

        void loadComments();

        return () => {
            active = false;
        };
    }, [eventId]);

    // POST - Create a comment
    async function postComment() {
        if (!commentData.trim() || !loggedInUserId) {
            return;
        }

        try {
            const response = await fetch(
                `/Comment/createComment/${eventId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        commentData,
                        userId: loggedInUserId
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to post comment: ${response.status}`
                );
            }

            const commentsResponse = await fetch(
                `/Comment/getAllComments/${eventId}`
            );

            if (!commentsResponse.ok) {
                throw new Error(
                    `Failed to refresh comments: ${commentsResponse.status}`
                );
            }

            const data: (Comment & { username: string })[] =
                await commentsResponse.json();

            setComments(data);
            setCommentData("");
            setError("");

        } catch (error) {
            console.error(error);
            setError("Could not post or refresh comments");
        }
    }
    async function editComment(commentId: string) {
        if (!editText.trim() || !loggedInUserId) {
            return;
        }

        try {
            const response = await fetch(
                `/Comment/editComment/${commentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        commentData: editText,
                        userId: loggedInUserId
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to edit comment: ${response.status}`
                );
            }

            setComments(prev =>
                prev.map(comment =>
                    comment._id?.toString() === commentId
                        ? { ...comment, commentData: editText }
                        : comment
                )
            );

            setEditingId(null);
            setEditText("");
            setError("");

        } catch (error) {
            console.error(error);
            setError("Could not edit comment");
        }
    }
    async function deleteComment(commentId: string) {
        if (!loggedInUserId) {
            return;
        }

        try {
            const response = await fetch(
                `/Comment/deleteComment/${commentId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: loggedInUserId
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to delete comment: ${response.status}`
                );
            }

            setComments(prev =>
                prev.filter(comment =>
                    comment._id?.toString() !== commentId
                )
            );

            setError("");

        } catch (error) {
            console.error(error);
            setError("Could not delete comment");
        }
    }

    return (
        <Box className="Comments-container" sx={{ p: 2 }}>
            <Typography
                variant="h5"
                className="stack-sans-headline-text text"
                sx={{ fontWeight: 700, mb: 2 }}
            >
                Comments
            </Typography>

            {error && (
                <Typography color="error">
                    {error}
                </Typography>
            )}

            {comments.length === 0 && !error && (
                <Typography className="stack-sans-headline-text text-two">
                    No comments yet.
                </Typography>
            )}

            {/* Display every comment */}
            {comments.map(comment => {
                const commentId = comment._id?.toString();

                const isOwner = !!loggedInUserId && loggedInUserId === comment.userid?.toString();

                const isEditing = editingId === commentId;

                return (
                    <Box key={commentId} sx={{ mb: 2, p: 1 }}>
                        <Typography className="stack-sans-headline-text text" sx={{ fontWeight: 700 }}> {comment.username} </Typography>
                        {isEditing ? (
                            <Box>
                                <TextField value={editText} onChange={e => setEditText(e.target.value)} fullWidth multiline margin="normal"/>
                                <Button onClick={() => { if (commentId) { void editComment(commentId);}}} disabled={!editText.trim()}> Save </Button>
                                <Button onClick={() => {setEditingId(null); setEditText(""); }}> Cancel</Button>
                            </Box>
                        ) : (
                            <>
                                <Typography className="stack-sans-headline-text text-two">{comment.commentData}</Typography>
                                {isOwner && commentId && (
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Button size="small" onClick={() => {setEditingId(commentId); setEditText(comment.commentData); }}> Edit</Button>
                                        <Button size="small" color="error" onClick={() => void deleteComment(commentId)}>Delete</Button>
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                );
            })}
            {/* Show input when Comments button is clicked */}
            {showInput && (
                <Box sx={{ mt: 2 }}>
                    <TextField label="Write a comment" value={commentData} onChange={e => setCommentData(e.target.value)} fullWidth multiline margin="normal"/>
                    <Button variant="contained" onClick={() => void postComment()} disabled={!commentData.trim() || !loggedInUserId}> Post Comment </Button>
                </Box>
            )}
        </Box>
    );
}