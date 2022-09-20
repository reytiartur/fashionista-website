import React from 'react'
import './CategoryContainer.scss'

const CategoryContainer = ({ category }) => {
const { name, imageUrl } = category
  return (
    <div className='category' style={{backgroundImage: `url(${imageUrl})`}}>
      <h2 className="title">{ name }</h2>
      <p>Shop Now</p>
    </div>
  )
}

export default CategoryContainer