import { ObjectId } from "mongodb";
export interface User {
    _id?: ObjectId;
    username: string;
    password: string;
    age: number;
    //several interest can be chosen
    interest: ("Sport" | "Music" |"Competition" |"Gaming")[];
    email: string;
}