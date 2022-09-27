import React ,{ useContext, useEffect, useState } from 'react'
import './Shop.scss'
import ShopItem from '../ShopItem/ShopItem'
import Filter from '../Filter/Filter'
import { FilterContext } from '../../context/FilterContext'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'

const Shop = () => {
  const [products, setProducts] = useState([])
  const { activeFilters } = useContext(FilterContext);
  const [filteredProducts, setFilteredProducts] = useState([])
  const { filterPrice } = useContext(FilterContext)
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
        setFilteredProducts(filteredArray);
      } else {
        setFilteredProducts(products);
      }
    }
    filterArray()   
  }, [activeFilters])

  useEffect(() => {
    const filteredArray = [...products].filter(item => { return item.tag.some(tag => activeFilters.includes(tag.toLowerCase())) && Number(item.price) > min && Number(item.price) < max; })
    setFilteredProducts(filteredArray);
  }, [filterPrice])
  


  return (
    <div className='shop-container'>
      <div className='category-name'>#Category#Name</div>
      <div className="category-options"> CATEGORIES </div>  
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