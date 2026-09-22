import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import type {Response, Request} from 'express';
import type { PaymentRequest } from '../model/PaymentRequest';
import { ModelServicesEvent } from '../model/service/ServicesEvent';
import { ModelservicesKlarna } from '../model/service/ServiceKlarna';
dotenv.config();

const app = express();
const Port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.post("/paymentSession", async (req:Request, res:Response) => {
    try {
        const paymentRequest : PaymentRequest = req.body;
        const eventService = new ModelServicesEvent();
        const event = eventService.getEventById(paymentRequest.eventId);

        if(event === undefined)
        {
            return res.status(404).json({error: "Event Not found"});
        }
        if(event === undefined)
        {
            return res.status(404).json({error: "Event not found"});
        }
        const klarnaService = new ModelservicesKlarna(paymentRequest, event);

        return klarnaService.createOrder(res);

    }
    catch 
    {
        return res.status(500).json({
            error: "Could not create Klarna payment session"
        });
    }
});


app.listen(Port, () => {
    console.log("Backend listening on port: ", Port )
});