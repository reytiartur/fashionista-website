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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';



const FullItemPage = () => {
  
  const { state } = useLocation()
  const { product } = state
  const { products, setProducts, filteredProducts, setFilteredProducts } = useContext(ProductsContext)
  const exactProduct = products.filter(item => item.name === product.name)[0]
  const { name, fit, category, size, price, imgUrl, slug, favorite, } = exactProduct;
  const [chosenSize, setChosenSize] = useState(null)
  const [expanded, setExpanded] = useState(false)

  const { addItemToCart, setIsCartOpen } = useContext(CartContext)

  const addProductToCart = () => {
    if(chosenSize === null) {
      setExpanded(true)
    } else {
      addItemToCart(product, chosenSize)
      setIsCartOpen(true)
    }
  }

  const checkFavorites = (e) => {
    const value = e.target.value
    const checkedChanged = products.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
    setProducts(checkedChanged)
    const checkedChangedFiltered = filteredProducts.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
    setFilteredProducts(checkedChangedFiltered)
  }

  const openSizeSelector = () => {
    setExpanded(true)
  }

  const exitSizeSelector = () => {
    setChosenSize(null)
    setExpanded(false)
  }

  const closeSizeSelector = () => {
    setExpanded(false)
  }

  const handleSelectSize = (value) => {
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
                    <div key={`${item[0]} ${item[1]}`} className="accordion-item"><span>{item[0]}</span><span>: {item[1]}</span></div>
                  )
                }}
              })}
            </div>
          </AccordionDetails>
      </Accordion>
        <div className='sizes'>
          <div onClick={openSizeSelector} className='size-selector'>
            <span>Select your size:</span>
            {chosenSize ? (<button>{chosenSize}</button>) : null}
            <ExpandMoreIcon />
          </div>
          <Dialog open={expanded}>
            <DialogTitle>
              <span>Select your size:</span>
              <CloseIcon onClick={exitSizeSelector} />
            </DialogTitle>
            <DialogContent dividers>
              <div className='size-variants'>{size.map(value => {
                  return (
                    <div className={`size-item ${chosenSize === value && 'active'}`} onClick={() => handleSelectSize(value)} value={value} key={value}>{value.toUpperCase()}</div>
                  )
                })}
              </div>
            </DialogContent>
            <DialogActions>
                <Button disabled={chosenSize === null} onClick={closeSizeSelector} buttonType={`inverted ${chosenSize === null && 'disabled'}`}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </div>
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