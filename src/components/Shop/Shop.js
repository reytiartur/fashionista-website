import React ,{ useContext, useEffect, useState } from 'react'
import './Shop.scss'
import ShopItem from '../ShopItem/ShopItem'
import Filter from '../Filter/Filter'
import { FilterContext } from '../../context/FilterContext'
import { ProductsContext } from '../../context/ProductsContext'
import CategoriesListMenu from '../CategoriesListMenu/CategoriesListMenu'


const Shop = () => {
  const { products, setProducts, filteredProducts, setFilteredProducts } = useContext(ProductsContext)
  const { activeFilters, setActiveFilters, filterPrice, checkedValue, setCheckedValue } = useContext(FilterContext);
  const { min, max } = filterPrice
  

  useEffect(() => {
    return setActiveFilters([])
  }, [])

  useEffect(() => {
    const filterArray = () => {
      if(activeFilters.length) {
        const filteredArray = products.filter(item => item.tag.some(tag => activeFilters.includes(tag.toLowerCase())))
        // const filteredArray = [...products].filter(item => activeFilters.every(filter => item.tag.includes(filter)) ? true : false)   
        setFilteredProducts(filteredArray);
      } else {
        setFilteredProducts(products);
      }
    }
    filterArray()   
  }, [activeFilters])

  useEffect(() => {
    const filteredArray = [...products].filter(item => { 
      if(activeFilters.length) {
        return item.tag.some(tag => activeFilters.includes(tag.toLowerCase())) && Number(item.price) > min && Number(item.price) < max;
      } else {
        return Number(item.price) > min && Number(item.price) < max
      }
    })
    setFilteredProducts(filteredArray);
  }, [filterPrice])
  
  const handleDeleteFilter = (filter) => {
    const deleteFilter = activeFilters.filter(item => item !== filter)
    setCheckedValue({...checkedValue, [filter]: { ...checkedValue[filter], checked: !checkedValue[filter].checked }})
    setActiveFilters(deleteFilter)
  }

  return (
    <div className='shop-container'>
      <div className='filters-name'>{activeFilters.map(filter => {
        return (
          <div key={filter.toLowerCase()} className='filter-button'>
            <span >{filter.toLowerCase()}</span>
            <div onClick={() => handleDeleteFilter(filter)}>&#x2716;</div>
          </div>
          )
      })}</div>
      <CategoriesListMenu />
      <Filter key='filter' />
      <div className="catalog">
        {filteredProducts.map(product => {
          return (
            <ShopItem key={product.name} product={product} />
          )
        })}
      </div>
    </div>
  )
}

export default Shop