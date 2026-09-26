import { getComments } from "../../DB/commentdata";
import type { Comment } from "../Comment";

export class ModelServicesComment {
    getAllComments(): Comment[] {
        return getComments();
    }
    PostComment(comment: Comment): void {
    getComments().push(comment);
}
DeleteComment(commentid: number): void {
    const comments = getComments();
    const index = comments.findIndex(
        comment => comment.commentid === commentid
    );

    if (index !== -1) {
        comments.splice(index, 1);
    }
}
editComment(commentid: number, newCommentData: string): void {
    const comment = getComments().find(
        comment => comment.commentid === commentid
    );

    if (comment) {
        comment.commentData = newCommentData;
    }
}
}
