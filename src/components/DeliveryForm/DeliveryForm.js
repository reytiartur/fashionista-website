import React from 'react'
import FormInput from '../FormInput/FormInput'
import { useState } from 'react'
import './DeliveryForm.scss'

const DeliveryForm = () => {
    const defaultDeliveryField = {
        region: '',
        city: '',
        zipCode: '',
        address: '',
        houseNum: '',
        doorNum: ''
    }

    const defaultBillingField = {
        region: '',
        city: '',
        zipCode: '',
        address: '',
        houseNum: '',
        doorNum: ''
    }

    const [ deliveryField, setDeliveryField] = useState(defaultDeliveryField);
    const [ billingField, setBillingField] = useState(defaultBillingField);

    const handleChange = (e, setFormField, formField) => {
        const { name, value } = e.target;
        setFormField({...formField, [name]: value})
    }

    const handleCheck = (e) => {
        if(e.target.checked) {
            setBillingField(deliveryField)
        } else {
            setBillingField(defaultBillingField)
        }
    }

  return (
    <>
        <form>
            <div className="delivery-container">
                <p>Delivery Address</p>
                <FormInput label='Region' type='text' required onChange={(e) => handleChange(e, setDeliveryField, deliveryField)} name='region' value={deliveryField.region} />
                <FormInput label='City' type='text' required onChange={(e) => handleChange(e, setDeliveryField, deliveryField)} name='city' value={deliveryField.city} />
                <FormInput label='Zip Code' type='text' required onChange={(e) => handleChange(e, setDeliveryField, deliveryField)} name='zipCode' value={deliveryField.zipCode} />
                <FormInput label='Address' type='text' required onChange={(e) => handleChange(e, setDeliveryField, deliveryField)} name='address' value={deliveryField.address} />
                <FormInput label='House Nr.' type='text' required onChange={(e) => handleChange(e, setDeliveryField, deliveryField)} name='houseNum' value={deliveryField.houseNum} />
                <FormInput label='Door Nr.' type='text' onChange={(e) => handleChange(e, setDeliveryField, deliveryField)} name='doorNum' value={deliveryField.doorNum} />
            </div>
            <div className="billing-container">
                <p>Billing Address</p>
                <FormInput label='Region' type='text' required onChange={(e) => handleChange(e, setBillingField, billingField)} name='region' value={billingField.region} />
                <FormInput label='City' type='text' required onChange={(e) => handleChange(e, setBillingField, billingField)} name='city' value={billingField.city} />
                <FormInput label='Zip Code' type='text' required onChange={(e) => handleChange(e, setBillingField, billingField)} name='zipCode' value={billingField.zipCode} />
                <FormInput label='Address' type='text' required onChange={(e) => handleChange(e, setBillingField, billingField)} name='address' value={billingField.address} />
                <FormInput label='House Nr.' type='text' required onChange={(e) => handleChange(e, setBillingField, billingField)} name='houseNum' value={billingField.houseNum} />
                <FormInput label='Door Nr.' type='text' onChange={(e) => handleChange(e, setBillingField, billingField)} name='doorNum' value={billingField.doorNum} />
            </div> 
        </form>
        <div className='checkbox'>
            <label htmlFor="sameDelivery">Billing Address is same as delivery address</label>
            <input type='checkbox' name='sameDelivery' onChange={handleCheck} />
        </div>
        
    </>
  )
}

export default DeliveryForm