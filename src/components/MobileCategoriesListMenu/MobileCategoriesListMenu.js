import React from 'react'
import { useState, useContext, Fragment } from 'react'
import { FilterContext } from '../../context/FilterContext'
import { ProductsContext } from '../../context/ProductsContext'
import categoriesList from '../../categories.json'
import './MobileCategoriesListMenu.scss'

const MobileCategoriesListMenu = () => {
    const { products, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
    const { chosenObjectCategory, setChosenObjectCategory } = useContext(FilterContext)
    const [ category, setCategory] = useState('all')
    const [ subCategory, setSubCategory] = useState("show all")

    const handleCategory = (objectCategory) => {
        const key = objectCategory.toLowerCase()
        setChosenObjectCategory(key)
        setCategory(objectCategory)
        setFilteredProducts(products[key])
        setSubCategory('show all')
        prevFilteredProducts.beforeFilter = products[key]
        prevFilteredProducts.current = products[key]
    };

    const handleOptionClick = (objectCategory, sub) => {
        const key = objectCategory.toLowerCase()
        const value = sub.toLowerCase()
        setChosenObjectCategory(key)
        setSubCategory(value)
        if(value === 'show all') {
          setFilteredProducts(products[key])
          prevFilteredProducts.beforeFilter = products[key]
          prevFilteredProducts.current = products[key]
        } else if(value === 'new') {
          const newProducts = products[key]?.filter(product => product.new)
          setFilteredProducts(newProducts)
          prevFilteredProducts.current = newProducts
          prevFilteredProducts.beforeFilter = newProducts
        } else {
          const categoryArray = products[key]?.filter(item => item.category.includes(value.toLowerCase()))
          setFilteredProducts(categoryArray)
          prevFilteredProducts.current = categoryArray
          prevFilteredProducts.beforeFilter = categoryArray
        }
      }

  return (
    <Fragment>
        <div className="mobile-category-options">
            {Object.keys(categoriesList).map(objectCategory => {
                return (
                <button key={objectCategory} onClick={() => handleCategory(objectCategory)} className={`mobile-option ${objectCategory === chosenObjectCategory && 'selected'}`}>{ objectCategory }</button> 
            )})}
        </div>
        <div className='mobile-options-list'>
              {categoriesList[chosenObjectCategory]?.map(sub => {
                return (
                  <button className={`mobile-option ${sub.toLowerCase() === subCategory && 'selected'}`} key={`${category} ${sub}`} onClick={() => handleOptionClick(category, sub)}>{sub}</button>
                ) 
              })}
        </div>
    </Fragment>
  )
}

export default MobileCategoriesListMenu