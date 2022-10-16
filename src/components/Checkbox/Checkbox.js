import React from 'react'
import './Checkbox.scss'

const Checkbox = ({ value, handleCheckbox, checkIfChecked }) => {
    
  return (
    <div className='custom-checkbox' >
        <label htmlFor={value} className='checkbox-label'>{value}</label>
        <input onChange={handleCheckbox} checked={checkIfChecked} type='checkbox' value={value} id={value} className="checkbox-input" />
    </div>  
  )
}

export default Checkbox