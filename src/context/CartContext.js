import { createContext, useEffect, useState } from "react";

const checkCartToAdd = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(item => item.name === productToAdd.name);

    if(existingCartItem) {
        return cartItems.map(item => item.name === productToAdd.name ? {...item, quantity: item.quantity + 1} : item)
    } else {
        return [...cartItems, {...productToAdd, quantity: 1}]
    }
}

const checkCartToRemove = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(item => item.name === productToRemove.name);

    if(existingCartItem.quantity === 0) {
        return cartItems.filter(item => item.name !== productToRemove.name)
    } else {
        return cartItems.map(item => item.name === productToRemove.name ? {...item, quantity: item.quantity - 1} : item)
    }
}

const checkCartToClear = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(item => item.name === productToRemove.name);
    if(existingCartItem) {
        return cartItems.filter(item => item.name !== productToRemove.name)
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItem: () => {},
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCount = cartItems.reduce((total, item) => total + item.quantity, 0)
        setCartCount(newCount)
    }, [cartItems])
    
    useEffect(() => {
        const newTotalCount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
        setCartTotal(newTotalCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(checkCartToAdd(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(checkCartToRemove(cartItems, productToRemove))
    }
    
    const clearItem = (productToRemove) => {
        setCartItems(checkCartToClear(cartItems, productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItem, cartCount, setCartCount, cartTotal, setCartTotal}
    return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}