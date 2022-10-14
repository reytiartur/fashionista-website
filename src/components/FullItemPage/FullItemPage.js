import React from 'react'
import { useLocation } from 'react-router-dom'
import './FullItemPage.scss'
import Button from '../../components/Button/Button'
import { Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductsContext } from '../../context/ProductsContext';
import ShopItem from '../ShopItem/ShopItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const FullItemPage = () => {
  
  const { state } = useLocation()
  const { product } = state
  const { products, setProducts, filteredProducts, setFilteredProducts } = useContext(ProductsContext)
  const exactProduct = products.filter(item => item.name === product.name)[0]
  const { name, fit, category, size, price, imgUrl, slug, favorite, } = exactProduct;
  const [chosenSize, setChosenSize] = useState(null)

  const { addItemToCart, setIsCartOpen } = useContext(CartContext)

  const addProductToCart = () => {
    addItemToCart(product, chosenSize)
    setIsCartOpen(true)
  }

  const checkFavorites = (e) => {
    const value = e.target.value
    const checkedChanged = products.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
    setProducts(checkedChanged)
    const checkedChangedFiltered = filteredProducts.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
    setFilteredProducts(checkedChangedFiltered)
  }

  const handleSelect = (e) => {
    const value = e.target.value;
    setChosenSize(value)
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
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <p className='details'>See details...</p>
          </AccordionSummary>
          <AccordionDetails>
            <div className='accordion-container'>
              {Object.entries(exactProduct).map(item => {
                if(item[0] === 'fit' || item[0] === 'season' || item[0] === 'sex' || item[0] === 'material' || item[0] === 'neckline' || item[0] === 'sleeve length' || item[0] === 'waist rise' || item[0] === 'length') {
                  if(item[1] === null) {
                    return;
                  } else {
                  return (
                    <div className="accordion-item"><span>{item[0]}</span><span>: {item[1]}</span></div>
                  )
                }}
              })}
            </div>
          </AccordionDetails>
      </Accordion>
        <select onChange={handleSelect} className='sizes' name='sizes'>
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