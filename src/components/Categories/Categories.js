import axios from 'axios'
import React from 'react'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import CATEGORIES from '../../categories.json'
import './Categories.scss'
import { useState } from 'react'


const Categories = () => {
    
    const [categories, setCategories] = useState(CATEGORIES)
    
    // const getCategories = async() => {
    //     try {
    //         const response = await axios('../categories')
    //         setCategories(response.data)
    //     } catch(err) {
    //         console.log(err.message)
    //     }
    // }
    // getCategories()

  return (
    <div className='categories-container'>
        {categories.map((category) => {
            return(
                <CategoryContainer key={category.name} category={category} />
            )
        })}
    </div>
  )
}

export default Categories