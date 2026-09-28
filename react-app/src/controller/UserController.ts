import type { User } from "../model/Users.ts";
import { ModelServicesUser } from "../model/service/ServicesUser.ts";

export class UserController {
  private model: ModelServicesUser;

  constructor() {
    this.model = new ModelServicesUser();
  }

  createUser(user: User) {
    return this.model.createUser(user);
  }

  getUser(index: number) {
    return this.model.getUserIndex(index);
  }

  getUserById(userId: number) {
  return this.model.getUserById(userId);
  }

  getUserByLogin(email: string, password: string) {
    return this.model.getUserByLogin(email, password);
  }

  getAllUsers() {
    return this.model.getAllUsers();
  }

  deleteUser(index: number) {
    return this.model.deleteUserIndex(index);
  }
}
