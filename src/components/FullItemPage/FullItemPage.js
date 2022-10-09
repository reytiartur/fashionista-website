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
  const addProductToCart = () => addItemToCart(product)
  const { products, setProducts, filteredProducts, setFilteredProducts } = useContext(ProductsContext)
  const exactProduct = products.filter(item => item.name === product.name)[0]
  const { name, fit, category, size, price, imgUrl, slug, favorite } = exactProduct;

  const { addItemToCart } = useContext(CartContext)


  const checkFavorites = (e) => {
    const value = e.target.value
    const checkedChanged = products.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
    setProducts(checkedChanged)
    const checkedChangedFiltered = filteredProducts.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
    setFilteredProducts(checkedChangedFiltered)
  }

  return (
    <div className='product-page-container'>
      <div className="img-container">
        <div className="product-img" style={{ backgroundImage:`url(${imgUrl})` }}></div>
      </div>
      <div className="product-info">
        <div className='name-container'>
          <p className='product-name'>{fit} {name}</p>
          <Checkbox key={name} checked={favorite} onChange={checkFavorites} value={name} icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
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
          {[...filteredProducts].filter(product => product.name !== exactProduct.name).slice(0, 6).map(product => {
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