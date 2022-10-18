import React, { useContext } from 'react'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import './Categories.scss'
import { ProductsContext } from '../../context/ProductsContext'


const Categories = () => {
    
const { categories } = useContext(ProductsContext)


  return (
    <div className='main-container'>
      <div className='text'>The most popular categories:</div>
      <div className='categories-container'>
          {Object.entries(categories).map((category) => {
              return(
                <CategoryContainer categories={categories} key={category[0]} categoryName={category[0]} categoryItems={category[1]} />
              )
          })}
      </div>
    </div>
  )
}

export default Categories