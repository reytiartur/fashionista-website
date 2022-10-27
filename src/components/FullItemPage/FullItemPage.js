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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import RecommendedCarousel from '../RecommendedCarousel/RecommendedCarousel';
import { UserContext } from '../../context/UserContext';



const FullItemPage = () => {
  
  const { state } = useLocation()
  const { product } = state
  const { products, setProducts, filteredProducts, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
  const exactProductAll = products.all.filter(item => item.id === product.id)[0]
  const { name, fit, category, size, price, imgUrl, slug, favorite, id } = exactProductAll;
  const [chosenSize, setChosenSize] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [recommendedArray, setRecommendedArray] = useState([])

  const { addItemToCart, setIsCartOpen } = useContext(CartContext)
  const { isMobile } = useContext(UserContext)

  useEffect(() => {
    window.scrollTo(0, 0)
    return setChosenSize(null)
  }, [state])

  useEffect(() => {
    const filteredIDs = filteredProducts.map(filtered => filtered.id)
    prevFilteredProducts.current = Object.values(products?.all)?.filter(item => filteredIDs.includes(item.id))
    setFilteredProducts(prevFilteredProducts.current)
    setRecommendedArray(prevFilteredProducts.current)
  }, [products])

  const addProductToCart = () => {
    if(chosenSize === null) {
      setExpanded(true)
    } else {
      addItemToCart(product, chosenSize)
      setChosenSize(null)
      if(!isMobile) {
        setIsCartOpen(true)
      }
    }
  }

  const checkFavorites = (e) => {
    console.log(filteredProducts)
    const value = Number(e.target.value)
    const allItem = Object.entries(products).map(cat => cat.map(items => typeof items === "string" ? items : items.map(item => item.id === value ? {...item, favorite: !item.favorite} : item)))
    const allItemObj = Object.fromEntries(allItem)
    setProducts(allItemObj)
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
          <Checkbox key={name} checked={favorite} onChange={checkFavorites} value={id} icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
        </div>
        <span className="price">{price} €</span>
        <div className='accordion-container'>
          {Object.entries(exactProductAll).map(item => {
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
        <div className='sizes'>
          <div onClick={openSizeSelector} className='size-selector'>
            <div className='text'>Select your size:</div>
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
        <RecommendedCarousel recommendedArray={recommendedArray} exactProductAll={exactProductAll} />
      </div>
    </div>
  )
}

export default FullItemPage