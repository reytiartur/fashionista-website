import React, { Fragment } from 'react'
import { Popper } from '@mui/material'
import { useState, useContext } from 'react'
import './CategoriesListMenu.scss'
import { ProductsContext } from '../../context/ProductsContext';
import { FilterContext } from '../../context/FilterContext';


const categoriesList = {
    "all": ["Show All", 'New', "Trousers", 'Jackets', 'Skirts', 'Dresses', 'Lingerie', "Shirts", "Suits", 'Pullovers', 'Shoes'], 
    "men": ["Show All", 'New', "Trousers", 'Jackets', "Shirts", "Suits", 'Pullovers', 'Shoes'], 
    "women": ["Show All", 'New', 'Skirts', 'Dresses', 'Lingerie', "Shirts", "Suits", 'Shoes'], 
  }
  

const CategoriesListMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { products, setProducts, filteredProducts, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
    const { chosenObjectCategory, setChosenObjectCategory } = useContext(FilterContext)

    const open = Boolean(anchorEl);

    const handleOpen = (e, objectCategory) => {
      setChosenObjectCategory(objectCategory)
      setAnchorEl(anchorEl ? null : e.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleOptionClick = (e, objectCategory) => {
      const value = e.target.innerText.toLowerCase();
      const key = objectCategory
      if(value === 'show all') {
        setFilteredProducts(products[key])
        prevFilteredProducts.current = products[key]
      } else if(value === 'new') {
        const newProducts = products[key]?.filter(product => product.new)
        setFilteredProducts(newProducts)
        prevFilteredProducts.current = newProducts
      } else {
        const categoryArray = products[key]?.filter(item => item.category.includes(value.toLowerCase()))
        setFilteredProducts(categoryArray)
        prevFilteredProducts.current = categoryArray
      }
      handleClose()
    }

  return (
    <div className="category-options">
      {Object.keys(categoriesList).map(objectCategory => {
        return (
        <Fragment key={objectCategory}>
          <button onMouseEnter={(e) => handleOpen(e, objectCategory)}>{ objectCategory }</button>
          <Popper open={open} anchorEl={anchorEl} placement="bottom" onMouseLeave={handleClose}>
            <div className='categories-options'>
              <div className='options-list'>
                <span className='options-title'>{ chosenObjectCategory }</span> 
                {categoriesList[chosenObjectCategory]?.map(sub => {
                  return (
                    <span className='option' key={`${objectCategory} ${sub}`} onClick={(e) => handleOptionClick(e, chosenObjectCategory)}>{sub}</span>
                  ) 
                })}
              </div>
            </div>
          </Popper>
        </Fragment>)
      })} 
    </div>  
  )
}

export default CategoriesListMenu