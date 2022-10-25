import React, { useContext, useEffect, useState, Fragment } from 'react'
import './Shop.scss'
import ShopItem from '../ShopItem/ShopItem'
import Filter from '../Filter/Filter'
import { FilterContext } from '../../context/FilterContext'
import { ProductsContext } from '../../context/ProductsContext'
import CategoriesListMenu from '../CategoriesListMenu/CategoriesListMenu'
import { Pagination } from '@mui/material';
import { UserContext } from '../../context/UserContext'
import FilterListIcon from '@mui/icons-material/FilterList';
import Drawer from '@mui/material/Drawer';
import { Badge } from '@mui/material';
import MobileCategoriesListMenu from '../MobileCategoriesListMenu/MobileCategoriesListMenu'


const Shop = () => {
  const { products, filteredProducts, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
  const { activeFilters, setActiveFilters, filterPrice, checkedValue, setCheckedValue  } = useContext(FilterContext);
  const { min, max } = filterPrice;
  const { isMobile } = useContext(UserContext)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [filterOpen, setFilterOpen] = useState(false)
  

  useEffect(() => {
    window.scrollTo(0, 0)
    return setActiveFilters([])
  }, [])

  useEffect(() => {
    const filteredIDs = filteredProducts.map(filtered => filtered.id)
    setTimeout(() => {
      prevFilteredProducts.current = Object.values(products?.all)?.filter(item => filteredIDs.includes(item.id))
      setFilteredProducts(prevFilteredProducts.current)
    }, 100)
  }, [products])


  useEffect(() => {
      if(activeFilters.length) {
        const filteredArray = prevFilteredProducts?.beforeFilter?.filter(item => item.tag?.some(tag => activeFilters.includes(tag?.toLowerCase())))
        setFilteredProducts(filteredArray);
      } else {
        const filteredArray = prevFilteredProducts?.beforeFilter?.filter(item => Number(item.price) >= min && Number(item.price) <= max)
        setFilteredProducts(filteredArray);
      }
    }, [activeFilters])

  useEffect(() => {
    const filteredArray = prevFilteredProducts?.beforeFilter?.filter(item => { 
      if(activeFilters.length) {
        return item.tag.some(tag => activeFilters.includes(tag?.toLowerCase())) && Number(item.price) >= min && Number(item.price) <= max;
      } else {
        return Number(item.price) >= min && Number(item.price) <= max
      }
    })
    setFilteredProducts(filteredArray);
  }, [filterPrice])
  
  const handleDeleteFilter = (filter) => {
    const deleteFilter = activeFilters.filter(item => item !== filter)
    setCheckedValue({...checkedValue, [filter]: { ...checkedValue[filter], checked: !checkedValue[filter].checked }})
    setActiveFilters(deleteFilter)
  }

  const toggleFilter = (bool) => {
    setFilterOpen(bool)
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
      {!isMobile ? (<CategoriesListMenu />) : (<MobileCategoriesListMenu />)}
      {!isMobile ? (<Filter key='filter' />) : null}
      {isMobile ? (
        <Fragment>
          <Badge color={'warning'} showZero badgeContent={activeFilters.length}>
            <FilterListIcon fontSize='large' className='filter-mobile' onClick={() => toggleFilter(true)} />
          </Badge>
          <Drawer anchor="left" open={filterOpen} onClose={() => toggleFilter(false)}>
            <Filter key='filter' />
          </Drawer>
        </Fragment>
        ) : null}
      <div className="catalog">
        {currentItems?.length ? currentItems.map(product => {
          return (
            <ShopItem key={`${product.id} ${Math.random()}`} product={product} />
          )
        }) : (<p className='no-match'>No products matched your search...</p>)}
      </div>
      <Pagination onChange={(e, value) => setCurrentPage(value)} count={pagesCount} page={currentPage} siblingCount={2} boundaryCount={2} color='warning' />
    </div>
  )
}

export default Shop