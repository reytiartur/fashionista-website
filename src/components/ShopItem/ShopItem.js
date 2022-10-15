import React from 'react'
import './ShopItem.scss'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { ProductsContext } from '../../context/ProductsContext';


const ShopItem = ({ product }) => {
    const { name, fit, price, imgUrl, slug, favorite } = product;
    const fullProductName = `${fit} ${name}`;
    const { products, setProducts, filteredProducts, setFilteredProducts } = useContext(ProductsContext)

    const navigate = useNavigate()

    const moveToItem = (e) => {
      if(e.target.classList.contains('click-to-move')) {
        navigate(`/shop/${slug}`, {state: { product }})
      }
    }

    const checkFavorites = (e) => {
      const value = e.target.value
      const checkedChanged = products.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
      setProducts(checkedChanged)
      const checkedChangedFiltered = filteredProducts.map(item => item.name === value ? {...item, favorite: !item.favorite} : item)
      setFilteredProducts(checkedChangedFiltered)
    }



  return (
    <div className='shop-item'>
        <div className='shop-item-img click-to-move' style={{ backgroundImage:`url(${imgUrl})` }} onClick={moveToItem} >
          { product.new ? (<span className='new-icon'>New!</span>) : null }
          <Checkbox key={product.name} checked={favorite} onChange={checkFavorites} value={name} className='fav-btn' icon={<FavoriteBorder />} checkedIcon={<Favorite color='error' />} />
        </div>
        <div className="shop-item-info">
            <p className="shop-item-name">{ fullProductName.length > 23 ? `${fullProductName.substring(0, 23)}...` : fullProductName }</p>
            <p className="shop-item-price">{ `${price} €` }</p>
        </div>    
        <p className="details click-to-move" onClick={moveToItem}>Show details </p>
    </div>
  )
}

export default ShopItem