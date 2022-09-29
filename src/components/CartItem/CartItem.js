import React from 'react'
import './CartItem.scss'

const CartItem = ({ cartItem }) => {
    const { name, price, imgUrl, quantity } = cartItem;

  return (
    <div className='cart-item-container'>
        <img src={imgUrl} alt={`${name}`} />
        <div className='item-details'>
            <span className='name'>{name}</span>
            <span className='price'>
            {quantity} x €{price}
            </span>
        </div>
    </div>
  )
}

export default CartItem