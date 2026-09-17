import { ModelServicesComment } from "../model/service/ServicesComment";
import { ModelServicesUser } from "../model/service/ServicesUser";
import { ModelServicesEvent } from "../model/service/ServicesEvent";
import { test } from 'vitest'

test("get data from DB map", () => {
    const comments = new ModelServicesComment();
    const users = new ModelServicesUser();
    const events = new ModelServicesEvent();

    console.log(comments.getAllComments());
    console.log(users.getAllUsers());
    console.log(events.getAllEvents());
});