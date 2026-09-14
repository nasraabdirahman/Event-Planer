import type { User } from "../model/Users";

const users : User[] = [
    {
        userId: 1,
        username: "alex123",
        password: "password123",
        age: 21,
        interest: ["Gaming", "Competition"],
        email: "alex123@email.com"
    },
    {
        userId: 2,
        username: "sarah22",
        password: "musicpass",
        age: 24,
        interest: ["Music", "Sport"],
        email: "sarah22@email.com"
    },
    {
        userId: 3,
        username: "mike_gamer",
        password: "gaming123",
        age: 19,
        interest: ["Gaming", "Sport"],
        email: "mike@email.com"
    },
    {
        userId: 4,
        username: "emma_events",
        password: "emma456",
        age: 27,
        interest: ["Music", "Competition"],
        email: "emma@email.com"
    },
    {
        userId: 5,
        username: "john_sport",
        password: "sport123",
        age: 31,
        interest: ["Sport", "Competition"],
        email: "john@email.com"
    }
];

export function getUsers(): User[]{
    return users;
}