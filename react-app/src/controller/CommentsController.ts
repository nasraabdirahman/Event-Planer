import type { Comment } from "../model/Comments";
import { getComments } from "../DB/commentdata";

export class CommentsController {

    PostComment(comment: Comment): void {
    const comments = getComments();
    comments.push(comment);
}

DeleteComment(commentid: number): void {
    const comments = getComments();
    const index = comments.findIndex(comment => comment.commentid === commentid);

    if (index !== -1) {
        comments.splice(index, 1);
    }
}

editComment(commentid: number, newCommentData: string): void {

    const comments = getComments();
    const comment = comments.find(comment => comment.commentid === commentid);
    if (comment) {
        comment.commentData = newCommentData;

}
}
}