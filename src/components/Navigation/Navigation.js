import React from 'react'
import './Navigation.scss'

import { BsCart4 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { signOutUser } from '../../utils/firebase/firebase'
import { Avatar } from '@mui/material'
import { Badge } from '@mui/material'
import CartDropdown from '../CartDropdown/CartDropdown'
import { CartContext } from '../../context/CartContext'

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  const userInitials = currentUser ? currentUser.displayName.split(" ").map(word => word.slice(0, 1)).join("") : null;

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <>
      <div className='navigation'>
        <GiHamburgerMenu className='sidebar-icon nav-icon' />
        <Link to="/"><div className='logo'>FASHIONISTA</div></Link>
        <div className='icons-container'>
          <Link to="/auth">{ currentUser ? (<Avatar onClick={handleSignOut} className="auth-icon" style={{fontSize: '18px'}} sx={{ width: 30, height: 30 }}>{ userInitials }</Avatar>) : (<CgProfile className="auth-icon nav-icon" />)}</Link>
          <Badge color='error' badgeContent={cartCount}><BsCart4 onClick={toggleCartOpen} className="cart-icon nav-icon" /></Badge>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  )
}

export default Navigation