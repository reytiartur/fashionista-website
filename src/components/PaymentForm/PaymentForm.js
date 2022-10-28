import React from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../Button/Button";
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import './PaymentForm.scss'
import { Dialog } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { display } from '@mui/system';

const paymentSuccessful = {text: 'Payment is successful!', icon: <CheckCircleOutlineIcon color='success' />}
const paymentError = {text: 'Payment error: Something went wrong!', icon: <ErrorIcon color='error' />}

const PaymentForm = ({ setActiveStep, setOpen }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { cartTotal, setCartItems } = useContext(CartContext)
    const { currentUser } = useContext(UserContext)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [alert, setAlert] = useState(null)
    const [alertOpen, setAlertOpen] = useState(false)

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
        handleOpen()

        if(paymentResult.error) {
            setAlert(paymentError)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                setAlert(paymentSuccessful)
                setActiveStep(0)
                setCartItems([])
            }
        }
    }

    const handleOpen = () => {
        setAlertOpen(true)
    }

    const handleClose = () => {
        setAlertOpen(false)
        setOpen(false)
    }

  return (
    <>
        <div className='payment-form-container'>
            <div>Provide your Credit Card information</div>
            <form onSubmit={paymentHandler} className="payment-form">
                <CardElement style={{fontSize: '1.25rem'}} />
                {isProcessingPayment ? (<Button disabled buttonType='disabled'>PROCESSING</Button>) : (<Button>PAY NOW</Button>)}
            </form>
        </div>
        <Dialog style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '5px'}} onClose={handleClose} open={alertOpen}>
            <div>
                <p style={{fontSize:"22px", fontWeight: 600, textAlign: 'center'}}>{alert?.text}</p>
                {alert?.icon}
                <Button onClick={handleClose}>Close</Button>
            </div>
        </Dialog>
    </>
  )
}

export default PaymentForm