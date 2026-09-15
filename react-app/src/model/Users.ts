
export interface User {
    userId: number;
    username: string;
    password: string;
    age: number;
    //several interest can be chosen
    interest: ("Sport" | "Music" |"Competition" |"Gaming")[];
    email: string;
}