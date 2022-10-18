import React, { Fragment } from 'react'
import { Popper } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import './CategoriesListMenu.scss'
import { ProductsContext } from '../../context/ProductsContext';


const categoriesList = {
    "All": ["Show All", 'New', "Trousers", 'Jackets', 'Skirts', 'Dresses', 'Lingerie', "Shirts", "Suits", 'Pullovers', 'Shoes'], 
    "Men": ["Show All", 'New', "Trousers", 'Jackets', "Shirts", "Suits", 'Pullovers', 'Shoes'], 
    "Women": ["Show All", 'New', 'Skirts', 'Dresses', 'Lingerie', "Shirts", "Suits", 'Shoes'], 
  }
  

const CategoriesListMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { categories, prevFilteredProducts, setFilteredCategory  } = useContext(ProductsContext)
    const [products, setProducts] = useState({})
    const [open, setOpen] = useState(false)
    const [chosenCategory, setChosenCategory] = useState(null)

    useEffect(() => {
      setProducts(categories)
    }, [categories]) 

    const handleOpen = (e, category) => {
      setOpen(true)
      setChosenCategory(category)
      setAnchorEl(anchorEl ? null : e.currentTarget);
    };

    const handleClose = () => {
      setOpen(false)
      setAnchorEl(null);
    };

    const handleOptionClick = (e, category) => {
      const value = e.target.innerText.toLowerCase();
      const key = category.toLowerCase()
      if(value === 'show all') {
        setFilteredCategory(products[key])
        prevFilteredProducts.current = products[key]
      } else if(value === 'new') {
        const newProducts = products[key]?.filter(product => product.new)
        setFilteredCategory(newProducts)
        prevFilteredProducts.current = newProducts

      } else {
        const categoryArray = products[key]?.filter(item => item.category.includes(value.toLowerCase()))
        setFilteredCategory(categoryArray)
        prevFilteredProducts.current = categoryArray
      }
      handleClose()
    }

  return (
    <div className="category-options">
      {Object.keys(categoriesList).map(category => {
        return (
        <Fragment key={category}>
          <button onMouseOver={(e) => handleOpen(e, category)} onMouseOut={handleClose}>{ category }</button>
          <Popper open={open} anchorEl={anchorEl} placement="bottom">
            <div className='categories-options'>
              <div className='options-list'>
                <span className='options-title'>{ chosenCategory }</span> 
                {categoriesList[chosenCategory]?.map(sub => {
                  return (
                    <span className='option' key={`${category} ${sub}`} onClick={(e) => handleOptionClick(e, chosenCategory)}>{sub}</span>
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