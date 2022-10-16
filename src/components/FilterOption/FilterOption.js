import React, { useContext, useEffect } from 'react'
import './FilterOption.scss'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FilterContext } from '../../context/FilterContext';
import { StylesProvider } from "@material-ui/core/styles";
import Checkbox from '../Checkbox/Checkbox';


const FilterOption = ({ filterName, filterValue }) => {

  const { checkedValue, setCheckedValue, activeFilters, setActiveFilters, filterOptions } = useContext(FilterContext)
  
  useEffect(() => {
    const filterValuesArray = Object.values(filterOptions).flat()
    filterValuesArray.map(filter => setCheckedValue(currentState => ({...currentState, [filter]: { ...currentState[filter], checked: false }})))
  }, [])

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
    <StylesProvider injectFirst>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <p className='filter-name'>{ filterName }</p>
        </AccordionSummary>
        <AccordionDetails className='accordion-details'>
          {filterValue?.map(value => {
            return (
              <Checkbox key={value} handleCheckbox={handleCheckbox} value={value} checkIfChecked={!!checkedValue[value]?.checked}  />        
          )})}
        </AccordionDetails>
      </Accordion>
    </StylesProvider>
  )
}

export default FilterOption