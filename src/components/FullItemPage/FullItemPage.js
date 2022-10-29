import React from 'react'
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
import { useParams } from 'react-router-dom';


const FullItemPage = () => {
  
  const { slug } = useParams()

  const { products, setProducts, filteredProducts, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
  const [exactProduct, setExactProduct] = useState([])



  useEffect(() => {
    setTimeout(() => {
      const findProduct = Object.values(products?.all)?.filter(item => item.slug === slug)
      setExactProduct(findProduct[0])
    }, 150)
  }, [products, slug])


  const [chosenSize, setChosenSize] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [recommendedArray, setRecommendedArray] = useState([])

  const { addItemToCart, setIsCartOpen } = useContext(CartContext)
  const { isMobile } = useContext(UserContext)

  useEffect(() => {
    window.scrollTo(0, 0)
    return setChosenSize(null)
  }, [slug])

  useEffect(() => {
    const filteredIDs = filteredProducts.map(filtered => filtered.id)
    setTimeout(() => {
      prevFilteredProducts.current = Object.values(products?.all)?.filter(item => filteredIDs.includes(item.id))
      setRecommendedArray(prevFilteredProducts.current)
    },100)
  }, [products])

  const addProductToCart = () => {
    if(chosenSize === null) {
      setExpanded(true)
    } else {
      addItemToCart(exactProduct, chosenSize)
      setChosenSize(null)
      if(!isMobile) {
        setIsCartOpen(true)
      }
    }
  }

  const checkFavorites = (e) => {
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
        <div className="product-img" style={{ backgroundImage:`url(${exactProduct.imgUrl})` }}></div>
      </div>
      <div className="product-info">
        <div className='name-container'>
          <p className='product-name'>{exactProduct.fit} {exactProduct.name}</p>
          <Checkbox key={exactProduct.name} checked={exactProduct.favorite} onChange={checkFavorites} value={exactProduct.id} icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
        </div>
        <span className="price">{exactProduct.price} €</span>
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
              <div className='size-variants'>{exactProduct.size?.map(value => {
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
        <RecommendedCarousel recommendedArray={recommendedArray} exactProduct={exactProduct} />
      </div>
    </div>
  )
}

export default FullItemPage