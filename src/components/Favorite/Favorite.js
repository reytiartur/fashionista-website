import React from 'react'
import ShopItem from '../ShopItem/ShopItem'
import './Favorite.scss'
import { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'

const Favorite = () => {
    const { products } = useContext(ProductsContext)

  return (
    <div className='favorite-container'>
        <p>Your Favorite Products:</p>
        <div className="favorite-products-container">
            {products.filter(product => product.favorite).map(product => {
                return(
                    <ShopItem key={product.name} product={product} />
                )
            })}
        </div>
    </div>
  )
}

export default Favorite