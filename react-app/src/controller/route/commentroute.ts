import { ObjectId } from "mongodb";
import RouteServiceComment from "../../../modelBackend/servicesBackend/routeServiceComment";
import express from "express";
import type Comment from "../../interfaces/Comment";

const router = express.Router();
const service = new RouteServiceComment();

//Get all comment for an event
router.get("/getAllComments/:id", async(req, res) =>{
    try{
        const eventId = req.params.id
        if(!ObjectId.isValid(eventId))
        {
            return res.status(400).json({message:"Invalid event ID"});
        }
        const result = await service.getAllComments(eventId);
        res.status(200).json(result) //success
    }
    catch(err)
    {
        res.status(500).json({message: "Failed to get comments"}) //Comments not found
    }
})
// Create a new comment
router.post("/createComment/:id", async(req,res) => {
    try {
        const eventId = req.params.id;
        const {commentData, userId} = req.body;
        if(!ObjectId.isValid(eventId))
        {
            return res.status(400).json({message:"Invalid event ID"});
        }
        if(typeof commentData !== "string" || !commentData.trim())
        {
            return res.status(400).json({message: "Comment cannot be empty"})
        }
        if (
            typeof userId !== "string" ||
            !ObjectId.isValid(userId)
        ) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        const comment: Comment = {
            eventid: new ObjectId(eventId),
            userid: new ObjectId(userId),
            commentData: commentData.trim(),
            date_comment_got_posted: new Date()
        };
        const result = await service.createComment(comment);
        return res.status(201).json(result);
    }
    catch(err)
    {
        return res.status(500).json({message: "Failed to create comment"})
    }
})

//Edit an existing comment
router.put("/editComment/:id", async(req,res)=> {
    try{
        const commentId = req.params.id;
        const {commentData} = req.body;
        if(!ObjectId.isValid(commentId))
        {
            return res.status(400).json({message:"Invalid comment ID"});
        }
        if(typeof commentData !== "string" || !commentData.trim())
        {
            return res.status(400).json({message: "Comment cannot be empty"})
        }
        const result = await service.editComment(commentId, commentData)
        if(result.matchedCount === 0)
        {
            return res.status(404).json({message: "comment not found"})
        }
        return res.status(200).json({message: "Comment updated successfully"})
    }
    catch(err)
    {
        return res.status(500).json({message: "Failed to update comment"})
    }
})

router.delete("/deleteComment/:id", async(req, res) => {
    try {
        const commentId = req.params.id;
        if(!ObjectId.isValid(commentId))
        {
            return res.status(400).json({message:"Invalid comment ID"});
        }
        const result = await service.deleteComment(commentId)
        if(result.deletedCount === 0)
        {
            return res.status(404).json({message: "Comment not found"})
        }
        return res.status(200).json({message: "comment deleted successfully"})
    }
    catch(err)
    {
        return res.status(500).json({message: "Failed to delete comment"})
    } 
})
export default router