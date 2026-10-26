import { ObjectId } from "mongodb";
import db from "../MongoDB/initDB"
import type Comment from "../../src/interfaces/Comment";

export default class RouteServiceComment {

    async getAllComments(id : string)
    {
        const eventid  = new ObjectId(id);
    return await db.collection<Comment>("Comments").aggregate([
        {
            $match: { eventid }
        },
        {
            $addFields: {
                userid: {
                    $ifNull: ["$userid", "$_userId"]
                }
            }
        },
        {
            $lookup: {
                from: "User",
                localField: "userid",
                foreignField: "_id",
                as: "author"
            }
        },
        {
            $unwind: {
                path: "$author",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                userid: 1,
                eventid: 1,
                commentData: 1,
                date_comment_got_posted: 1,
                username: {
                    $ifNull: ["$author.username", "Unknown user"]
                }
            }
        },
        {
            $sort: {
                date_comment_got_posted: 1
            }
        }
    ]).toArray();
}

    async createComment(comment : Comment)
    {
        return await db.collection<Comment>("Comments").insertOne(comment)
    }

    async deleteComment(comment_Id : string)
    {
        const commentId = new ObjectId(comment_Id)
        return await db.collection<Comment>("Comments").deleteOne({_id:commentId})
    }

    async editComment(comment_Id:string, newCommentData:string)
    {
        const commentId = new ObjectId(comment_Id);
        return await db.collection<Comment>("Comments").updateOne({_id:commentId}, {$set: {commentData: newCommentData}})
    }
}