import React from 'react'
import './ShopItem.scss'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Checkbox } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { ProductsContext } from '../../context/ProductsContext';
import { FilterContext } from '../../context/FilterContext';
import { UserContext } from '../../context/UserContext';


const ShopItem = ({ product }) => {
    const { name, fit, price, imgUrl, slug, favorite, id } = product;
    const fullProductName = `${fit} ${name}`;
    const { products, setProducts, filteredProducts, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
    const { isMobile } = useContext(UserContext)
    
    const navigate = useNavigate()

    const moveToItem = (e) => {
      if(e.target.classList.contains('click-to-move')) {
        prevFilteredProducts.current = filteredProducts;
        navigate(`/shop/${slug}`, {state: { product }})
      }
    }

    const checkFavorites = (e) => {
      const value = Number(e.target.value)
      const allItem = Object.entries(products).map(cat => cat.map(items => typeof items === "string" ? items : items.map(item => item.id === value ? {...item, favorite: !item.favorite} : item)))
      const allItemObj = Object.fromEntries(allItem)
      setProducts(allItemObj)
    }



  return (
    <div className='shop-item'>
        <div className='shop-item-img click-to-move' style={{ backgroundImage:`url(${imgUrl})` }} onClick={moveToItem} >
          { product.new ? (<span className='new-icon'>New!</span>) : null }
          <Checkbox key={product.name} checked={favorite} onChange={checkFavorites} value={id} className='fav-btn' icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{opacity: '1', top: "10px", right: '10px'}} color='error' />} />
        </div>
        <div className="shop-item-info">
            <p className="shop-item-name">{ isMobile && fullProductName.length > 16 ? `${fullProductName.substring(0, 16)}...` : fullProductName.length > 20 ? `${fullProductName.substring(0, 20)}...` : fullProductName }</p>
            <p className="shop-item-price">{ `${price} €` }</p>
        </div>    
        <p className="details click-to-move" onClick={moveToItem}>Show details </p>
    </div>
  )
}

export default ShopItem