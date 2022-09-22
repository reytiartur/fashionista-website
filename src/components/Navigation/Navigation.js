import React from 'react'
import './Navigation.scss'

import { BsCart4 } from 'react-icons/bs'
import { CgProfile, CgLogOut } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { signOutUser } from '../../utils/firebase/firebase'
import { Avatar } from '@mui/material'
import { Badge } from '@mui/material'

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  const userInitials = currentUser ? currentUser.displayName.split(" ").map(word => word.slice(0, 1)).join("") : null;


  return (
    <>
      <div className='navigation'>
        <GiHamburgerMenu className='sidebar-icon nav-icon' />
        <Link to="/"><div className='logo'>FASHIONISTA</div></Link>
        <div className='icons-container'>
          <Link to="/auth">{ currentUser ? (<Avatar onClick={handleSignOut} className="auth-icon" style={{fontSize: '18px'}} sx={{ width: 30, height: 30 }}>{ userInitials }</Avatar>) : (<CgProfile className="auth-icon nav-icon" />)}</Link>
          <Link to="/cart"><Badge color='error' badgeContent={4}><BsCart4 className="cart-icon nav-icon" /></Badge></Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Navigation