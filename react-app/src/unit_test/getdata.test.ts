import { getAllComments } from "../model/service/getComments";
import { getAllUsers } from "../model/service/getUser";
import { ModelServicesEvent } from "../model/service/getEvents";
import { test } from 'vitest'

test("get data from DB map", () =>{
    const comments = getAllComments();
    const users = getAllUsers();
    const events = new ModelServicesEvent();

    console.log(comments, users, events.getAllEvents());
});