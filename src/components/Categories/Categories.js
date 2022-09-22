import React from 'react'
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import CATEGORIES from '../../categories.json'
import './Categories.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Categories = () => {
    
    const [categories, setCategories] = useState(CATEGORIES)

  return (
    <div className='categories-container'>
        {categories.map((category) => {
            return(
                <Link to='/shop'><CategoryContainer key={category.name} category={category} /></Link>
            )
        })}
    </div>
  )
}

export default Categories