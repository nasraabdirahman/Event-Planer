import { getAllComments } from "../model/service/getComments";
import { getAllUsers } from "../model/service/getUser";
import { getAllEvents } from "../model/service/getEvents";
import { test } from 'vitest'

test("get data from DB map", () =>{
    const comments = getAllComments();
    const users = getAllUsers();
    const events = getAllEvents();

    console.log(comments, users, events);
});