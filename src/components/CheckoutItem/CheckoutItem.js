import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CheckoutItem.scss'

const CheckoutItem = ({ item }) => {
    const { name, quantity, price, imgUrl, size } = item;

    const { addItemToCart, removeItemFromCart, clearItem } = useContext(CartContext)

  return (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imgUrl} alt={`${name}`} />
        </div>
        <span className='name'> {name} </span>
        <span className='size'> {size} </span>
        <span className='quantity'>
        <div className='arrow' onClick={() => removeItemFromCart(item)}>
            &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItemToCart(item)}>
            &#10095;
        </div>
        </span>
        <span className='price'> {price}</span>
        <div className='remove-button' onClick={() => clearItem(item)}>
        &#10005;
        </div>
    </div>
    )
}

export default CheckoutItem