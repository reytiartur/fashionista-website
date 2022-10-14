import React from 'react'
import './CategoryContainer.scss'
import { useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../context/ProductsContext'
import { useContext } from 'react'


const CategoryContainer = ({ categories, categoryName, categoryItems }) => {

  const categoryProduct = categoryItems[Math.floor(Math.random() * (categoryItems.length - 1) )]
  const { imgUrl } = categoryProduct

  const { setFilteredProducts } = useContext(ProductsContext)
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/shop')
    setTimeout(() => {setFilteredProducts([...categories[categoryName]])}, 100)
  }

  return (
    <div onClick={handleNavigate} className='category' style={{backgroundImage: `url(${imgUrl})`}}>
      <h2 className="title">{ categoryName }</h2>
      <p>Shop Now</p>
    </div>
  )
}

export default CategoryContainer