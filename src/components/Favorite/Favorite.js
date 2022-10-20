import React from 'react'
import ShopItem from '../ShopItem/ShopItem'
import './Favorite.scss'
import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'

const Favorite = () => {
    const { products } = useContext(ProductsContext)
    const favoriteProducts = products.all.filter(product => product.favorite);

  return (
    <div className='favorite-container'>
        <p className='favorite-text'>Your Favorite Products:</p>
        <div className="favorite-products-container">
            {favoriteProducts.length ? favoriteProducts.map(product => {
                return(
                    <ShopItem key={product.name} product={product} />
                )
            }) : (<div className='no-favorite'>You have no favorite products...</div>)}
        </div>
    </div>
  )
}

export default Favorite