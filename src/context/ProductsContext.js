import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";

export const ProductsContext = createContext({
    products: [],
    setProducts: () => {},
    filteredProducts: [],
    setFilteredProducts: () => {},
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

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

    const value = { products, setProducts, filteredProducts, setFilteredProducts }

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}