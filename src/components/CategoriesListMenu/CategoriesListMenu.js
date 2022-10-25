import React from 'react'
import { Popper } from '@mui/material'
import { useState, useContext } from 'react'
import './CategoriesListMenu.scss'
import { ProductsContext } from '../../context/ProductsContext';
import { FilterContext } from '../../context/FilterContext';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import categoriesList from '../../categories.json'


  

const CategoriesListMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { products, setFilteredProducts, prevFilteredProducts } = useContext(ProductsContext)
    const { chosenObjectCategory, setChosenObjectCategory } = useContext(FilterContext)
    const [ category, setCategory] = useState(null)

    const open = Boolean(anchorEl);

    const handleOpen = (e, objectCategory) => {
      setCategory(objectCategory)
      setAnchorEl(anchorEl ? null : e.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleOptionClick = (e, objectCategory) => {
      const value = e.target.innerText.toLowerCase();
      const key = objectCategory
      setChosenObjectCategory(objectCategory)
      if(value === 'show all') {
        setFilteredProducts(products[key])
        prevFilteredProducts.beforeFilter = products[key]
        prevFilteredProducts.current = products[key]
      } else if(value === 'new') {
        const newProducts = products[key]?.filter(product => product.new)
        setFilteredProducts(newProducts)
        prevFilteredProducts.current = newProducts
        prevFilteredProducts.beforeFilter = newProducts
      } else {
        const categoryArray = products[key]?.filter(item => item.category.includes(value.toLowerCase()))
        setFilteredProducts(categoryArray)
        prevFilteredProducts.current = categoryArray
        prevFilteredProducts.beforeFilter = categoryArray
      }
      handleClose()
    }

  return (
    <div className="category-options">
      {Object.keys(categoriesList).map(objectCategory => {
        return (
          <button key={objectCategory} onClick={(e) => handleOpen(e, objectCategory)} className={`${objectCategory === chosenObjectCategory && 'selected'}`}>{ objectCategory }</button> 
      )})}
      <Popper disablePortal={true} open={open} anchorEl={anchorEl} placement="bottom" onClick={handleClose} sx={{ zIndex: 'modal' }} >
        <ClickAwayListener onClickAway={handleClose}>
          <div className='categories-options'>
            <div className='options-list'>
              {categoriesList[category]?.map(sub => {
                return (
                  <span className='option' key={`${category} ${sub}`} onClick={(e) => handleOptionClick(e, category)}>{sub}</span>
                ) 
              })}
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
    </div>  
  )
}

export default CategoriesListMenu