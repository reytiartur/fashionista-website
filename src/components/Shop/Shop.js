import React ,{ useContext, useEffect, useState } from 'react'
import './Shop.scss'
import ShopItem from '../ShopItem/ShopItem'
import Filter from '../Filter/Filter'
import { FilterContext } from '../../context/FilterContext'
import { ProductsContext } from '../../context/ProductsContext'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'
import CategoriesListMenu from '../CategoriesListMenu/CategoriesListMenu'


const Shop = () => {
  const { products, setProducts, filteredProducts, setFilteredProducts } = useContext(ProductsContext)
  const { activeFilters, filterPrice } = useContext(FilterContext);
  const { min, max } = filterPrice
  
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories')
      setProducts([])
      setFilteredProducts([])
      for(let category in categoryMap) {
        categoryMap[category].map(item => {
          const tagArray = []
          for(const sub in item) {
            if(sub !== 'name' && sub !== 'imgUrl' && sub !=='price') {
              tagArray.push(item[sub])
            }
          }
          item.tag = tagArray.flat();
          setProducts(prevProducts => [...prevProducts, item])
          setFilteredProducts(prevProducts => [...prevProducts, item])
        })
      }
    }
    getCategoriesMap()
  }, [])


  useEffect(() => {
    const filterArray = () => {
      if(activeFilters.length) {
        const filteredArray = [...products].filter(item => item.tag.some(tag => activeFilters.includes(tag.toLowerCase())))
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
  


  return (
    <div className='shop-container'>
      <div className='category-name'>#Category#Name</div>
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