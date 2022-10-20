import React from 'react'
import './CategoryContainer.scss'
import { useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../context/ProductsContext'
import { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'


const CategoryContainer = ({ categories, categoryName, categoryItems }) => {

  const categoryProduct = categoryItems[Math.floor(Math.random() * (categoryItems.length - 1) )]
  const { imgUrl } = categoryProduct

  const { setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
  const { setChosenObjectCategory } = useContext(FilterContext)

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/shop')
    setChosenObjectCategory(categoryName.toLowerCase())
    setTimeout(() => {setFilteredProducts([...categories[categoryName]])}, 100)
    prevFilteredProducts.current = [...categories[categoryName]]
  }

  return (
    <div onClick={handleNavigate} className='category' style={{backgroundImage: `url(${imgUrl})`}}>
      <h2 className="title">{ categoryName }</h2>
      <p>Shop Now</p>
    </div>
  )
}

export default CategoryContainer