import React, { useContext } from 'react'
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import './NewCollection.scss'
import { useNavigate } from 'react-router-dom';
import { StylesProvider } from "@material-ui/core/styles";


const NewCollection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { products, setFilteredProducts } = useContext(ProductsContext)
    const newCollection = products.filter(product => product.new === true)
    const maxSteps = newCollection.length
    const navigate = useNavigate()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNewCollection = () => {
        navigate('/shop', )
        setTimeout(() => {setFilteredProducts([...newCollection])}, 100)
    }


  return (
    <div className='new'>
        <div onClick={handleNewCollection} className='new-img' style={{ backgroundImage:`url(${newCollection[activeStep]?.imgUrl})` }}>
            <div className='new-text'>
                <p className='text-new'>New Collection</p>
                <p className='text-shop'>Shop Now</p>
            </div>
        </div>
        <StylesProvider injectFirst>
            <MobileStepper steps={maxSteps} position="static" activeStep={activeStep} 
                nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}> 
                    <span>Next</span><KeyboardArrowRight />
                </Button>}
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft /><span>Back</span>
                </Button>}/>
        </StylesProvider>
    </div>
  )
}

export default NewCollection