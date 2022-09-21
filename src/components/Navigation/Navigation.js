import React from 'react'
import './Navigation.scss'

import { BsCart4 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link, Outlet } from 'react-router-dom'

const Navigation = () => {
  return (
    <>
      <div className='navigation'>
        <GiHamburgerMenu className='sidebar-icon nav-icon' />
        <Link to="/"><div className='logo'>FASHIONISTA</div></Link>
        <div className='icons-container'>
          <Link to="/auth"><CgProfile className="auth-icon nav-icon" /></Link>
          <Link to="/cart"><BsCart4 className="cart-icon nav-icon" /></Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation