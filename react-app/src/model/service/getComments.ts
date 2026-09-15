import { getComments } from "../../DB/commentdata";
import type { Comment } from "../Comments";

export function getAllComments() : Comment[] {
    return getComments();
} 