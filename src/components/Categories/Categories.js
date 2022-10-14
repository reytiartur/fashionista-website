import React from 'react'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import './Categories.scss'
import { useState, useEffect } from 'react'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'


const Categories = () => {
    
  const [categories, setCategories] = useState([])


  
  useEffect(() => {
    const getCategoriesMap = async () => {
    const categoryMap = await getCategoriesAndDocuments('categories')
    setCategories(categoryMap)
    }
    getCategoriesMap()
  }, [])



  return (
    <div className='categories-container'>
        {Object.entries(categories).map((category) => {
            return(
              <CategoryContainer categories={categories} key={category[0]} categoryName={category[0]} categoryItems={category[1]} />
            )
        })}
    </div>
  )
}

export default Categories