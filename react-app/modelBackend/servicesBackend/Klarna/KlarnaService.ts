import dotenv from "dotenv"
import { KlarnaData } from "./Klarna";
import { KlarnaOrderLine } from "./Klarna";
import routeServiceEvent 
dotenv.config();

export default class KlarnaService
{
    private user = getUserEvents()

    createOrderLine() : KlarnaOrderLine
    {
        return {
            reference:this.
        }
    } 

    createKlarnaObject() : KlarnaData
    {
        const orderline = this.cre
    }

    async openSession()
    {
        const username = process.env.KLARNA_USERNAME;
        const password = process.env.KLARNA_PASSWORD;

        if(!username || !password){
            throw new Error("Klarna credentials are missing");
        }
        //preparing
        const auth = Buffer.from(`${username}:${password}`).toString("base64");

        const response = await fetch("https://api.playground.klarna.com/payments/v1/sessions",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${auth}`
            },
            body: JSON.stringify(KlarnaData)
        })
    }
}