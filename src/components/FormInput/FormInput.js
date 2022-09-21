import React from 'react'
import './FormInput.scss'

const FormInput = ({label, type,  ...props}) => {
  return (
    <div className='form-grouping'>
        <input type={type} {...props} /> 
        {label && (
            <label className={`${props.value.length ? 'shrink' : ''}`}>{ label }</label>
        )}  
    </div>
  )
}

export default FormInput