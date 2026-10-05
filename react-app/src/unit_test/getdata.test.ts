import { ModelServicesComment } from "../controller/service/ServicesComment";
import { ModelServicesUser } from "../controller/service/ServicesUser";
import { ModelServicesEvent } from "../controller/service/ServicesEvent";
import { test } from 'vitest'

test("get data from DB map", () => {
    const comments = new ModelServicesComment();
    const users = new ModelServicesUser();
    const events = new ModelServicesEvent();

    console.log(comments.getAllComments());
    console.log(users.getAllUsers());
    console.log(events.getAllEvents());
});