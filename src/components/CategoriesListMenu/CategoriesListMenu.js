import React from 'react'
import { Popper } from '@mui/material'
import { ClickAwayListener } from '@mui/base';
import { useState, useEffect, useContext } from 'react'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase'

import './CategoriesListMenu.scss'
import { ProductsContext } from '../../context/ProductsContext';


const categoriesList = {
    "Men": ["Show All", 'New', "Trousers", 'Jackets', "Shirts", "Suits", 'Pullovers', 'Shoes'], 
    "Women": ["Show All", 'New', 'Skirts', 'Dresses', 'Lingerie', "Shirts", "Suits", 'Shoes'], 
  }
  

const CategoriesListMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [products, setProducts] = useState([])
    const { setFilteredProducts } = useContext(ProductsContext)
    
    useEffect(() => {
      const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments('categories')
      setProducts(categoryMap)
      }
      getCategoriesMap()
    }, [])
    
    const open = Boolean(anchorEl);

    const handleOpenClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleOptionClick = (e, category) => {
      const value = e.target.innerText.toLowerCase();
      const key = category.toLowerCase()
      if(value === 'show all') {
        setFilteredProducts(products[key])
      } else if(value === 'new') {
        const newProducts = products[key].filter(product => product.new)
        setFilteredProducts(newProducts)
      } else {
        const categoryArray = products[key].filter(item => item.category.includes(value.toLowerCase()))
        setFilteredProducts(categoryArray)
      }
      handleClose()
    }

  return (
    <div className="category-options">
        <button onClick={handleOpenClick}>CATEGORIES</button>
        <Popper open={open} anchorEl={anchorEl} placement="bottom">
          <ClickAwayListener onClickAway={handleClose}>
            <div className='categories-options'>
              {Object.keys(categoriesList).map(category => {
                return (
                  <div key={category} className='options-list'>
                    <span className='options-title'>{category}</span> 
                      {Object.values(categoriesList[category]).map(value => {
                        return (
                          <span className='option' key={value} onClick={(e) => handleOptionClick(e, category)}>{value}</span>
                        ) 
                    })}
                  </div>
                )
              })}
            </div>
          </ClickAwayListener>
        </Popper>
    </div>  
  )
}

export default CategoriesListMenu