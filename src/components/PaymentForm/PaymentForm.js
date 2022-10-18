import React from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../Button/Button";
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import './PaymentForm.scss'


const PaymentForm = ({ setOpen }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { cartTotal } = useContext(CartContext)
    const { currentUser } = useContext(UserContext)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault()

        if(!stripe || !elements) return;

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ amount: cartTotal * 1000 })
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        })

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
                setOpen(false)
            }
        }
    }

  return (
    <div className='payment-form-container'>
        <div>Provide your Credit Card information</div>
        <form onSubmit={paymentHandler} className="payment-form">
            <CardElement style={{fontSize: '1.25rem'}} />
            {isProcessingPayment ? (<Button disabled buttonType='disabled'>PROCESSING</Button>) : (<Button>PAY NOW</Button>)}
        </form>
    </div>
  )
}

export default PaymentForm