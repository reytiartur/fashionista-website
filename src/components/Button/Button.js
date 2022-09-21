import React from 'react'
import './Button.scss'

const Button = ({ children, buttonType, ...otherProps}) => {

  return (
    <button className={`button ${buttonType}`} {...otherProps}>{children}</button>
  )
}

export default Button