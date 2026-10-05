import { ModelServicesComment } from "../model/toBeDeleted/ServicesComment";
import { ModelServicesUser } from "../model/toBeDeleted/ServicesUser";
import { test } from 'vitest'

test("get data from DB map", () => {
    const comments = new ModelServicesComment();
    const users = new ModelServicesUser();
   

    console.log(comments.getAllComments());
    console.log(users.getAllUsers());
});