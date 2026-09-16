import { getComments } from "../../DB/commentdata";
import type { Comment } from "../Comment";

export class ModelServicesComment {
    getAllComments(): Comment[] {
        return getComments();
    }
}
