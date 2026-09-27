import { getUsers } from "../../DB/userdata.ts";
import type { User } from "../Users.ts";

export class ModelServicesUser {
  createUser(user: User) {
    getUsers().push(user);
  }

  getUserIndex(index: number) {
    return getUsers()[index];
  }

  getUserById(userId: number) {
  return getUsers().find(user => user.userId === userId);
}

  getAllUsers(): User[] {
    return getUsers();
  }

  deleteUserIndex(index: number) {
    getUsers().splice(index, 1);
  }
}
