import type { Comment } from "../model/Comments";
import { getComments } from "../DB/commentdata";

export function PostComment(comment: Comment): void {
    const comments = getComments();
    comments.push(comment);
}

export function DeleteComment(commentid: number): void {
    const comments = getComments();
    const index = comments.findIndex(comment => comment.commentid === commentid);

    if (index !== -1) {
        comments.splice(index, 1);
    }
}

export function editComment(commentid: number, newCommentData: string): void {

    const comments = getComments();
    const comment = comments.find(comment => comment.commentid === commentid);
    if (comment) {
        comment.commentData = newCommentData;

}
}