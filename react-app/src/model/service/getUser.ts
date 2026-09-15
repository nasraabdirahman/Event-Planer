import { getUsers } from "../../DB/userdata";
import type { User } from "../Users";

export function getAllUsers(): User[]
{
    return getUsers();
} 