import React from 'react'
import './CategoryContainer.scss'
import { useNavigate } from 'react-router-dom'
import { ProductsContext } from '../../context/ProductsContext'
import { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'


const CategoryContainer = ({ categoryName, categoryItems }) => {

  const categoryProduct = categoryItems[Math.floor(Math.random() * (categoryItems.length - 1) )]
  const { imgUrl } = categoryProduct

  const { products, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
  const { chosenObjectCategory, setChosenObjectCategory } = useContext(FilterContext)

  const navigate = useNavigate()

  const handleNavigate = () => {
    setChosenObjectCategory(categoryName)
    setTimeout(() => {setFilteredProducts(products[categoryName])}, 125)
    setTimeout(() => {prevFilteredProducts.beforeFilter = products[categoryName]}, 150)
    navigate('/shop')
  }

  return (
    <div onClick={handleNavigate} className='category' style={{backgroundImage: `url(${imgUrl})`}}>
      <h2 className="title">{ categoryName }</h2>
      <p>Shop Now</p>
    </div>
  )
}

export default CategoryContainer