import { getUsers } from "../../DB/userdata.ts";
import type { User } from "../Users.ts";

export class ModelServicesUser {
  //Crete new user
  createUser(user: User) {
    getUsers().push(user);
  }
  // Gets a user by index
  getUserIndex(index: number) {
    return getUsers()[index];
  }

  // Gets a user by user ID
  getUserById(userId: number) {
  return getUsers().find(user => user.userId === userId);
  }

  //Gets a user by email and password
  getUserByLogin( email: string, password: string) {
    return getUsers().find(
      user => user.email === email && user.password === password
    );
  }
  // Gets all users
  getAllUsers(): User[] {
    return getUsers();
  }
  // Deletes a user by index
  deleteUserIndex(index: number) {
    getUsers().splice(index, 1);
  }
}
