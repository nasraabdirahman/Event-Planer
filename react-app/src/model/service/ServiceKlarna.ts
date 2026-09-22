import type { KlarnaData } from "../Klarna";
import type { KlarnaOrderLine } from "../Klarna";
import type { PaymentRequest } from "../PaymentRequest";
import type { Event } from "../Event";
import dotenv from "dotenv";
import type {Response} from 'express';
dotenv.config();

export class ModelservicesKlarna 
{
    private payment : PaymentRequest;
    private event : Event;
    constructor(payment : PaymentRequest, event : Event)
    {
        this.payment = payment;
        this.event = event;
    }
    createOrderLine() : KlarnaOrderLine
    {
        return {
            reference: this.payment.eventId.toString(),
            name: this.event.title,
            quantity: 1,
            //klarna amounts money in minor units
            unit_price: this.event.price * 100,
            total_amount: this.event.price * 100
        };
    }

    createKlarnaorderObject() :KlarnaData
    {
        //creates its own orderline
        const orderline = this.createOrderLine();
        return {
            purchase_country: "SE",
            purchase_currency: "SEK",
            order_amount: orderline.total_amount,
            order_lines: [orderline]
        }
    }

   async createOrder(res:Response) {
        const klarnaService = new ModelservicesKlarna(this.payment, this.event);
        const klarnaData = klarnaService.createKlarnaorderObject();
        const username = process.env.KLARNA_USERNAME;
        const password = process.env.KLARNA_PASSWORD;
        if(!username || !password)
        {
            return res.status(500).json({
                error: "Klarna credentials missing"
            });
        }
        const auth = Buffer.from(`${username}:${password}`).toString("base64");

        const response = await fetch("https://api.playground.klarna.com/payments/v1/sessions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${auth}`
                },
                body: JSON.stringify(klarnaData)
            }
        )
        const data = await response.json();

        if(!response.ok)
        {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data)
    }
}