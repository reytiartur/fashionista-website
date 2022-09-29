import React, { Fragment, useContext, useEffect } from 'react'
import './FilterOption.scss'
import { useState } from 'react';
import { Popper } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { FilterContext } from '../../context/FilterContext';


const FilterOption = ({ filterName, filterValue }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const { checkedValue, setCheckedValue, activeFilters, setActiveFilters, filterOptions } = useContext(FilterContext)
  
  useEffect(() => {
    const filterValuesArray = Object.values(filterOptions).flat()
    filterValuesArray.map(filter => setCheckedValue(currentState => ({...currentState, [filter]: { ...currentState[filter], checked: false }})))
  }, [])


  const handleOpenClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  let open = Boolean(anchorEl);

  const handleClickAway = () => {
    setAnchorEl(null)
  }

  const handleCheckbox = (event) => {
    const value = event.target.value;
    setCheckedValue({...checkedValue, [value]: { ...checkedValue[value], checked: !checkedValue[value].checked }})
    if(activeFilters.includes(value)) {
      const deleteFromArray = activeFilters.filter(item => item !== value)
      setActiveFilters(deleteFromArray)
    } else {
      setActiveFilters([...activeFilters, value])
    }
  }


  return (
    <Fragment key={filterName} >
      <li onClick={handleOpenClick} className="filter-option">{filterName}</li>
      <Popper open={open} anchorEl={anchorEl} placement="right-start">
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className='popper'>
            {filterValue.map(value => {
                return (
                  <div key={`${value}`} className='popper-item'>
                    <label className='popper-label'>{value}</label>
                    <input onChange={handleCheckbox}
                     checked={checkedValue[value]?.checked} 
                     type='checkbox' value={value} className="popper-checkbox" />
                  </div>
                )}
            )}
           </div>
        </ClickAwayListener>
      </Popper>
    </Fragment>
  )
}

export default FilterOption