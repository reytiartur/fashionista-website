import React from 'react'
import './ShopItem.scss'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';


const ShopItem = ({ product }) => {
    const { name, fit, category, size, price, imgUrl } = product;
    const fullProductName = `${fit} ${name}`;
    const { addItemToCart } = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)

  return (
    <div className='shop-item'>
        <div className='shop-item-img' style={{ backgroundImage:`url(${imgUrl})` }}>
          <button onClick={addProductToCart}>Add To Cart</button>
        </div>
        <div className="shop-item-info">
            <p className="shop-item-name">{ fullProductName.length > 23 ? `${fullProductName.substring(0, 23)}...` : fullProductName }</p>
            <p className="shop-item-price">{ `${price} €` }</p>
        </div>    
        <Link><p className="details">Show details </p></Link>
    </div>
  )
}

export default ShopItem