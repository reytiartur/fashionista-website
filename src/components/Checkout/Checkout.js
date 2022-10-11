import React from 'react'
import './Checkout.scss'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import CheckoutItem from '../CheckoutItem/CheckoutItem'
import PaymentForm from '../PaymentForm/PaymentForm'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { Modal, Step, StepLabel, Stepper, Box } from '@mui/material'
import { Button as MUIButton } from '@mui/material'
import DeliveryForm from '../DeliveryForm/DeliveryForm'

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);

    const steps = [
        {
            label: "Delivery details",
            component: <DeliveryForm />
        },
        {
            label: "Payment details",
            component: <PaymentForm setOpen={setOpen} />
        }
    ]

    const maxSteps = steps.length;

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

  return (
    <div className='checkout-container'>
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        <div className="checkout-items-container">
        {cartItems.length ? cartItems?.map(item => {
            return (
                <CheckoutItem key={item.name} item={item} />
            )
        }) : (<p>Your cart is empty...</p>)}
        </div>
        <span className='total'>Total: {cartTotal}€</span>
        <div className='button-container'>
            <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
            <Button buttonType='inverted' onClick={handleOpen}>Purchase Now</Button>
        </div>
        
        <Modal open={open} onClose={handleClose}>
            <div className='modal-container'>
                <Stepper activeStep={activeStep}>
                    {steps.map(step => {
                        return (<Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                         </Step>)
                    })}
                </Stepper>
                <div className='modal-content'>{steps[activeStep].component}</div>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <MUIButton color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Back</MUIButton>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <MUIButton color="inherit" disabled={activeStep === maxSteps - 1} onClick={handleNext}>Next</MUIButton>
                </Box>
            </div>
        </Modal>
    </div>
  )
}

export default Checkout