import React from 'react'
import './Navigation.scss'

import { BsCart4 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='navigation'>
        <GiHamburgerMenu className='sidebar-icon nav-icon' />
        <Link to="/"><div className='logo'>FASHIONISTA</div></Link>
        <div className='icons-container'>
          <CgProfile className="auth nav-icon" />
          <BsCart4 className="cart nav-icon" />
        </div>
    </div>
  )
}

export default Navigation