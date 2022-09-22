import React from 'react'
import './ShopItem.scss'
import { Link } from 'react-router-dom';

const ShopItem = ({ product }) => {
    const { name, fit, category, size, price, imgUrl } = product;
    const fullProductName = `${fit} ${name}`;

  return (
    <div className='shop-item'>
        <div className='shop-item-img' style={{ backgroundImage:`url(${imgUrl})` }} />
        <div className="shop-item-info">
            <p className="shop-item-name">{ fullProductName.length > 23 ? `${fullProductName.substring(0, 23)}...` : fullProductName }</p>
            <p className="shop-item-price">{ `${price} €` }</p>
        </div>    
        <Link><p className="details">Show details </p></Link>
    </div>
  )
}

export default ShopItem