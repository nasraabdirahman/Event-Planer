import { describe, it, expect } from "vitest";
import { CommentsController } from "../src/controller/CommentsController";
import { getComments } from "../src/DB/commentdata";
import { getUsers } from "../src/DB/userdata";

describe("CommentsController", () => {
    const controller = new CommentsController();

    it("should post a comment", () => {
        const newComment = {
    commentid: 7,
    userid: 1,
    commentData: "Test comment",
    eventid: 1,
    date_comment_got_posted: "2026-09-15 21:00:00"
};

controller.PostComment(newComment);


expect(getComments()).toContainEqual(newComment);

});


it("should get a specific comment with its user", () => {

    const comment = getComments().find(comment => comment.commentid === 1);
    const user = getUsers().find(user => user.userId === comment?.userid);


    expect(comment).toBeDefined();
    expect(user).toBeDefined();
    expect(user?.username).toBe("alex123");

});

});