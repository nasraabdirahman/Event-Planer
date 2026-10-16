import { ObjectId } from "mongodb";

export default interface Comment {
    _id?: ObjectId;
    userid: ObjectId;
    commentData: string;
    eventid: ObjectId;
    date_comment_got_posted: Date;
}

