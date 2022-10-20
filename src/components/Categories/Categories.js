import React, { useContext } from 'react'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import './Categories.scss'
import { ProductsContext } from '../../context/ProductsContext'


const Categories = () => {
    
const { products } = useContext(ProductsContext)


  return (
    <div className='main-container'>
      <div className='text'>The most popular categories:</div>
      <div className='categories-container'>
          {Object.entries(products).map((category) => {
              return(
                <CategoryContainer categories={products} key={category[0]} categoryName={category[0]} categoryItems={category[1]} />
              )
          })}
      </div>
    </div>
  )
}

export default Categories