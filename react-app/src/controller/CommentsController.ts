//import type { Comment } from "../model/Comment";
import { ModelServicesComment } from "../model/service/ServicesComment";

export class commentController 
{
    //call function from modelservices
    private model : ModelServicesComment;
    constructor()
    {
        this.model = new ModelServicesComment();
    }

    getallComment()
    {
        return this.model.getAllComments();
    }
}