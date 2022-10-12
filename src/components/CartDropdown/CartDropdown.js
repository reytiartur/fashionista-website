import React from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './CartDropdown.scss'

const CartDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext)

    const navigate = useNavigate()
    const goToCheckout = () => {
        navigate('/checkout')
        setIsCartOpen(!isCartOpen);
    }

  return (
    <div className='cart-dropdown-container'>
        <div className="cart-items">
            {cartItems.length ? (
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.name} cartItem={cartItem} />
                ))
            ) : (
                <span className='empty-message'>Your cart is empty</span>
            )}
        </div>
        <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown