import React from 'react'
import { useLocation } from 'react-router-dom'
import './FullItemPage.scss'
import Button from '../../components/Button/Button'
import { Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductsContext } from '../../context/ProductsContext';
import ShopItem from '../ShopItem/ShopItem';

const FullItemPage = () => {
  
  const { state } = useLocation()
  const { product } = state
  const { name, fit, category, size, price, imgUrl, slug } = product;


  const { addItemToCart } = useContext(CartContext)
  const addProductToCart = () => addItemToCart(product)
  const { products, filteredProducts } = useContext(ProductsContext)
  const recommendedProducts = [...filteredProducts]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

  return (
    <div className='product-page-container'>
      <div className="img-container">
        <div className="product-img" style={{ backgroundImage:`url(${imgUrl})` }}></div>
      </div>
      <div className="product-info">
        <div className='name-container'>
          <p className='product-name'>{fit} {name}</p>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
        </div>
        <span className="price">{price} €</span>
        {/* product details */}
        <select className='sizes' name='sizes'>
          <option value="" disabled selected hidden>Select your size...</option>
          {size.map(value => {
            value = value.toUpperCase();
            return (
              <option key={value} value={value}>{value}</option>
            )
          })}
        </select>
        <Button onClick={addProductToCart}>Add To Cart</Button>
      </div>
      <div className="recommended-container">
        <div className='recommended-text'>Recommended for you:</div>
        <div className='recommended-products'>
          {recommendedProducts.slice(0, 6).map(product => {
            return(
              <ShopItem product={product} key={product.name} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FullItemPage