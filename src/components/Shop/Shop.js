import React from 'react'
import './Shop.scss'
import ShopItem from '../ShopItem/ShopItem'

const Shop = () => {

  const products = [
    {
      name: 'Floral Dress',
      fit: '',
      category: ['women','dresses', 'summer'],
      size: ['s', 'm', 'l'],
      price: 35,
      imgUrl: 'https://images.pexels.com/photos/9856082/pexels-photo-9856082.jpeg?auto=compress&cs=tinysrgb',
    },
    {
      name: 'Comfort Coat',
      fit: '',
      category: ['women','coats', 'winter'],
      size: ['s', 'm', 'l'],
      price: 105,
      imgUrl: 'https://images.pexels.com/photos/11075296/pexels-photo-11075296.jpeg?auto=compress&cs=tinysrgb',
    },
    {
      name: 'Trench Coat',
      fit: 'Skinny Fit',
      category: ['men','coats', 'spring', 'autumn'],
      size: ['s', 'm', 'l'],
      price: 95,
      imgUrl: 'https://images.pexels.com/photos/5588532/pexels-photo-5588532.jpeg?auto=compress&cs=tinysrgb',
    },
    {
      name: 'Suit Trousers',
      fit: 'Skinny Fit',
      category: ['men','trousers', ],
      size: ['s', 'm', 'l'],
      price: 35,
      imgUrl: 'https://images.pexels.com/photos/9197312/pexels-photo-9197312.jpeg?auto=compress&cs=tinysrgb',
    },
    {
      name: 'Smart Pants',
      fit: 'Oversize',
      category: ['women','pants', 'summer', 'spring'],
      size: ['s', 'm', 'l'],
      price: 45,
      imgUrl: 'https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&dpr=3',
    }
  ]

  return (
    <div className='shop-container'>
      <div className="category-options"> CATEGORIES </div>
      <div className="filters"> FILTERS </div>
      <div className="catalog">
        {products.map(product => {
          return (
            <ShopItem key={product.name} product={product} />
          )
        })}
      </div>
    </div>
  )
}

export default Shop