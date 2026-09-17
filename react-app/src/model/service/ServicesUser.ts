import { getUsers } from "../../DB/userdata";
import type { User } from "../Users";

export class ModelServicesUser 
{
    getAllUsers(): User[]
    {
        return getUsers();
    } 
}
