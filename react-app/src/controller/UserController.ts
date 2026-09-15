import { getUsers } from "../DB/userdata";
import type { User } from "../model/Users";

export function createUser(
    username: string,
    password: string,
    age: number,
    interest: User["interest"],
    email: string
): User | null {
    const users = getUsers();

    const userExists = users.some(
        (user) =>
            user.username === username ||
            user.email === email
    );

    if (userExists) {
        return null;
    }

    const newUser: User = {
        userId: users.length + 1,
        username: username,
        password: password,
        age: age,
        interest: interest,
        email: email
    };

    users.push(newUser);

    return newUser;
}

export function login(
    username: string,
    password: string
): User | null {
    const users = getUsers();

    const user = users.find(
        (user) =>
            user.username === username &&
            user.password === password
    );

    if (!user) {
        return null;
    }

    return user;
}