import React from 'react'
import './Navigation.scss'

import { BsCart4 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { signOutUser } from '../../utils/firebase/firebase'
import { Avatar } from '@mui/material'
import { Badge } from '@mui/material'
import CartDropdown from '../CartDropdown/CartDropdown'
import { CartContext } from '../../context/CartContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { Popper } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
  const [userInitials, setUserInitials] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  const handleOpenClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  let open = Boolean(anchorEl);

  const handleClickAway = () => {
    setAnchorEl(null)
  }

  const moveToAuth = () => {
    navigate('/auth')
  }

  useEffect(() => {
    const checkForUser = async () => {
      if(currentUser) {
        await setUserInitials(currentUser.displayName.split(" ").map(word => word.slice(0, 1)).join(""));
      } else {
        await setUserInitials(null)
      }
      return userInitials;
    }
    checkForUser()
  }, [currentUser])
  

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <>
      <div className='navigation'>
        <GiHamburgerMenu className='sidebar-icon nav-icon' />
        <Link to="/"><div className='logo'>FASHIONISTA</div></Link>
        <div className='icons-container'>
          { currentUser ? (
          <>
            <Avatar onClick={handleOpenClick} className="auth-icon" style={{fontSize: '18px'}} sx={{ width: 30, height: 30 }}>{ userInitials }</Avatar>
            <Popper disablePortal={true} open={open} anchorEl={anchorEl} placement="bottom">
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className='account-popper'>
                  <div onClick={() => navigate('/favorite')} className='account-popper-elem'>
                    <p>Favorites</p>
                    <FavoriteBorder />
                  </div>
                  <div onClick={handleSignOut} className='account-popper-elem'>
                    <p>Logout</p>
                    <LogoutIcon />
                  </div>
                </div>
              </ClickAwayListener>
            </Popper>
          </>
          ) : (
          <CgProfile className="auth-icon nav-icon" onClick={moveToAuth} />)
          } 
          <Badge color='error' badgeContent={cartCount}><BsCart4 onClick={toggleCartOpen} className="cart-icon nav-icon" /></Badge>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  )
}

export default Navigation