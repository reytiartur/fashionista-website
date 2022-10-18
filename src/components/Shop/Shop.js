import React ,{ useContext, useEffect, useState, useRef } from 'react'
import './Shop.scss'
import ShopItem from '../ShopItem/ShopItem'
import Filter from '../Filter/Filter'
import { FilterContext } from '../../context/FilterContext'
import { ProductsContext } from '../../context/ProductsContext'
import CategoriesListMenu from '../CategoriesListMenu/CategoriesListMenu'
import { Pagination } from '@mui/material';


const Shop = () => {
  const { products, setProducts, filteredProducts, setFilteredProducts, prevFilteredProducts, filteredCategory } = useContext(ProductsContext)
  const { activeFilters, setActiveFilters, filterPrice, checkedValue, setCheckedValue } = useContext(FilterContext);
  const { min, max } = filterPrice;
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  

  useEffect(() => {
    return setActiveFilters([])
  }, [])


  useEffect(() => {
    const filterArray = () => {
      if(activeFilters.length) {
        const filteredArray = filteredCategory.filter(item => item.tag.some(tag => activeFilters.includes(tag?.toLowerCase())))
        setFilteredProducts(filteredArray);
      } else {
        setFilteredProducts(prevFilteredProducts.current);
      }
    }
    filterArray()   
  }, [activeFilters, filteredCategory])

  useEffect(() => {
    const filteredArray = [...products]?.filter(item => { 
      if(activeFilters.length) {
        return item.tag.some(tag => activeFilters.includes(tag?.toLowerCase())) && Number(item.price) > min && Number(item.price) < max;
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts?.slice(indexOfFirstItem, indexOfLastItem)

  const pagesCount = Math.ceil(filteredProducts?.length / itemsPerPage)

  return (
    <div className='shop-container'>
      <div className='filters-name'>{activeFilters.map(filter => {
        return (
          <div key={filter.toLowerCase()} className='filter-button'>
            <span >{filter}</span>
            <div onClick={() => handleDeleteFilter(filter)}>&#x2716;</div>
          </div>
          )
      })}</div>
      <CategoriesListMenu />
      <Filter key='filter' />
      <div className="catalog">
        {currentItems.length ? currentItems.map(product => {
          return (
            <ShopItem key={product.name} product={product} />
          )
        }) : (<p className='no-match'>No products matched your search...</p>)}
      </div>
      <Pagination onChange={(e, value) => setCurrentPage(value)} count={pagesCount} page={currentPage} siblingCount={2} boundaryCount={2} color='primary' />
    </div>
  )
}

export default Shop