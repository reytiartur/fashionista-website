import React ,{ useContext, useEffect, useState } from 'react'
import './Shop.scss'
import ShopItem from '../ShopItem/ShopItem'
import Filter from '../Filter/Filter'
import { FilterContext } from '../../context/FilterContext'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'

const Shop = () => {
  const [products, setProducts] = useState([])
  const { activeFilters } = useContext(FilterContext);
  
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories')
      setProducts([])
      for(let category in categoryMap) {
        categoryMap[category].map(item => {
          setProducts(prevProducts => [...prevProducts, item])
        })
      }
    }
    console.log(products)
    getCategoriesMap()
  }, [])



  return (
    <div className='shop-container'>
      <div className='category-name'>#Category#Name</div>
      <div className="category-options"> CATEGORIES </div>  
      <Filter key='filter' />
      <div className="catalog">
        {products.map(product => {
          return (
            <ShopItem key={product.name} product={product} />
          )
        })}
      </div>
    </div>
  )
}

export default Shop