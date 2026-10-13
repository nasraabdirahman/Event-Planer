import dotenv from "dotenv"
import { KlarnaData } from "./Klarna";
import { KlarnaOrderLine } from "./Klarna";

export default class KlarnaService
{
    constructor(user,)

    createOrderLine() : KlarnaOrderLine
    {

    } 

    createKlarnaObject() : KlarnaData
    {
        const orderline = this.createOrderLine();
        return {
            purchase_country : "SE",
            purchase_currency : "SEK",
            order_amount : orderline.total_number,
            order_lines: [orderline]
        }
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