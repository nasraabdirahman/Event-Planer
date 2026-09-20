import { getUsers } from "../../DB/userdata.ts";
import type { User } from "../Users.ts";

export class ModelServicesUser {
  createUser(user: User) {
    getUsers().push(user);
  }

  getUserIndex(index: number) {
    return getUsers()[index];
  }

  getAllUsers(): User[] {
    return getUsers();
  }

  deleteUserIndex(index: number) {
    getUsers().splice(index, 1);
  }
}
