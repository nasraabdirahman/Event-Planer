import '../css/style.css'
import Button from '@mui/material/Button';
import { useState } from "react";



function UserPayment ()
{
    const [klarnaLoaded, setKlarnaLoaded] = useState(false);
    async function handlePayment() {
        const paymentRequest = {
            eventId: 2,
            userId: 1
        }
        const response = await fetch(
            "http://localhost:3000/paymentSession",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentRequest)
            }
        )
        const data = await response.json();

        if(!response.ok)
        {
            alert("Could not create payment session");
            return;
        }
        const clientToken = data.client_token;
        (window as any).Klarna.Payments.init({
            client_token: clientToken
        });
        //show Klarna payment
        (window as any).Klarna.Payments.load({
            container: "#klarna-payments-container"
        },
        {},
        function(result:any)
        {
            if(result.show_form)
            {
                 setKlarnaLoaded(true);
            }
        }
    )
        alert("Got Klarna client Token");
    }
    function authorizePayment()
    {
        (window as any).Klarna.Payments.authorize(
            {},
            {},
            function(result:any)
            {
                if(result.approved)
                {
                    alert("Payment authorized");
                }
                else{
                    alert("Payment was not approved");
                }
            }
        )
    }
    return (
        <>
        <div className='payment-box'>
            <Button variant='contained' onClick={handlePayment}>Payment with Klarna</Button>
            <Button variant='contained' onClick={authorizePayment}  disabled={!klarnaLoaded}>Continue Payment</Button>
        </div>
        <div id="klarna-payments-container"></div>
        </> 
    )
}



export default UserPayment;