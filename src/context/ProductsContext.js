import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments, addCollectionAndDocuments } from "../utils/firebase/firebase";
// import PRODUCTS from "../products";

export const ProductsContext = createContext({
    products: [],
    setProducts: () => {},
    filteredProducts: [],
    setFilteredProducts: () => {},
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    // !!! Helper Firestore Database Update Function !!!
    // useEffect(() => {
    //   const setCategories = async () => {
    //     PRODUCTS.forEach(product => product.items ? Object.values(product.items).map(item => {
    //       const tagArray = []
    //       for(const sub in item) {
    //         if(sub === 'category' || sub === 'color' || sub === 'fit' || sub === 'season' || sub === 'sex' || sub === 'material' || sub === 'neckline' || sub === 'sleeve length' || sub === 'waist rise' || sub === 'length' ) { 
    //           tagArray.push(item[sub])
    //         }
    //       }
    //       item.tag = tagArray.flat();
    //       return item;
    //     })
    //     .map(item => {
    //         item.slug = (item.name + " " + item.fit).toLowerCase().split(" ").join("-") + '/'
    //         return item
    //       })
    //     .map(item => item.favorite = false) 
    //       : Object.values(product.title))
    //     await addCollectionAndDocuments("categories", PRODUCTS)
    //   }
    //   setCategories()
    // }, [])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories')
      setProducts([])
      setFilteredProducts([])
      for(let category in categoryMap) {
        categoryMap[category].map(item => {
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