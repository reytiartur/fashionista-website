import React from 'react'
import './Button.scss'

const Button = ({ children, buttonType, ...otherProps}) => {

  return (
    <button className={`button ${buttonType}`} {...otherProps}>{buttonType === 'google' ? (<><img className='google-icon' src='https://developers.google.com/static/identity/images/g-logo.png' /> {children}</>) : children}</button>
  )
}

export default Button