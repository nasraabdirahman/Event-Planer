
const baseUrl = "https://api.playground.klarna.com"

export default class KlarnaService {
    private getAuth()
    {
        const username = process.env.KLARNA_USERNAME;
        const password = process.env.KLARNA_PASSWORD;

        if(!username || !password)
        {
            throw new Error("Klarna credentials missing")
        }
        return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
    }

    async createPayment(eventId: string, title: string, price: number)
    {
        const auth = this.getAuth()
        const amount = Math.round(price*100)

        const paymentResponse = await fetch(`${baseUrl}/payments/v1/sessions`,
        {
            method: "POST",
            headers: {
                Authorization: auth,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                purchase_country: "SE",
                purchase_currency: "SEK",
                order_amount: amount,
                order_tax_amount: 0,
                order_lines: [{
                    name: title,
                    quantity: 1,
                    unit_price: amount,
                    total_amount: amount
                }]
            })
        })
        if(!paymentResponse.ok)
        {
            throw new Error(await paymentResponse.text())
        }
        const paymentSession: {session_id: string} = await paymentResponse.json();
        // Create Klarna Hosted Payment Page
        const hppResponse = await fetch(
            `${baseUrl}/hpp/v1/sessions`,
            {
                method: "POST",
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    payment_session_url:
                        `${baseUrl}/payments/v1/sessions/${paymentSession.session_id}`,
                    merchant_urls: {
                        success:
                            `http://localhost:5173/event/${eventId}?payment=success&sessionId={{session_id}}`,
                        back:
                            `http://localhost:5173/event/${eventId}`,
                        failure:
                            `http://localhost:5173/event/${eventId}?payment=failed`
                    },
                    options: {
                        place_order_mode: "PLACE_ORDER"
                    }
                })
            }
        );
        if (!hppResponse.ok) {
            throw new Error(await hppResponse.text());
        }
        return await hppResponse.json() as {
            session_id: string; 
            redirect_url: string;
        }
    }

    async verifyPayment(sessionId: string)
    {
        const response = await fetch(`${baseUrl}/hpp/v1/sessions/${encodeURIComponent(sessionId)}`,{
            headers: {
                Authorization: this.getAuth()
            }
        });
        if(!response.ok)
        {
            throw new Error("Could not Verify payment")
        }
        const payment = await response.json() as {
            status: string, 
            order_id?: string
        }

        return payment.status === "COMPLETED" && !!payment.order_id ? payment.order_id : null
    }
}