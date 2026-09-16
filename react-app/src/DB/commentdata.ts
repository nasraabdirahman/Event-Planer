import type { Comment } from "../model/Comment";

const comments: Comment[] = [
    {
        commentid: 1,
        userid: 1,
        commentData: "Interesting event",
        eventid: 1,
        date_comment_got_posted: "2026-09-14 14:30:00"
    },
    {
        commentid: 2,
        userid: 1,
        commentData: "I'm definitely interested in joining.",
        eventid: 1,
        date_comment_got_posted: "2026-09-14 14:35:00"
    },
    {
        commentid: 3,
        userid: 2,
        commentData: "Will there be music at the event?",
        eventid: 1,
        date_comment_got_posted: "2026-09-14 15:10:00"
    },
    {
        commentid: 4,
        userid: 3,
        commentData: "Are there still places available?",
        eventid: 2,
        date_comment_got_posted: "2026-09-14 16:20:00"
    },
    {
        commentid: 5,
        userid: 4,
        commentData: "This looks really fun!",
        eventid: 2,
        date_comment_got_posted: "2026-09-14 16:45:00"
    },
    {
        commentid: 6,
        userid: 5,
        commentData: "What time does the competition start?",
        eventid: 3,
        date_comment_got_posted: "2026-09-14 17:05:00"
    }
];

export function getComments(): Comment[] {
    return comments;
}