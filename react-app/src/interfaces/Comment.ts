import { ObjectId } from "mongodb";

export default interface Comment {
    _id?: ObjectId;
    userid: ObjectId;
    commentData: string;
    eventid: ObjectId;
    //maybe have date object instead of a string?
    date_comment_got_posted: Date;
}

