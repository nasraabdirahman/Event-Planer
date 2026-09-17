//import type { User } from "../model/Users";
import { ModelServicesUser } from "../model/service/ServicesUser";

export class UserController 
{
    //call functions from ModelServicesUser
    private model : ModelServicesUser
    constructor() 
    {
        this.model = new ModelServicesUser();
    }

    getUser()
    {
        return this.model.getAllUsers();
    }
}