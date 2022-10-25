import React from 'react'
import './Navigation.scss'
import { BsCart4 } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect, Fragment } from 'react'
import { UserContext } from '../../context/UserContext'
import { signOutUser } from '../../utils/firebase/firebase'
import { Avatar } from '@mui/material'
import { Badge } from '@mui/material'
import CartDropdown from '../CartDropdown/CartDropdown'
import { CartContext } from '../../context/CartContext'
import { Popper } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import LogoutIcon from '@mui/icons-material/Logout';
import BackButton from '../BackButton/BackButton';
import MobileNavigation from '../MobileNavigation/MobileNavigation'


const Navigation = () => {
  const { currentUser, setCurrentUser, isHome, isMobile } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
  const [userInitials, setUserInitials] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const [resetNav, setResetNav] = useState(null);

  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOutUser();
    handleOpenClick()
    setCurrentUser(null);
    navigate('/auth')
  }

  const handleFavorite = () => {
    handleOpenClick()
    navigate('/favorite')
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
  
  const handleNavigationClick = () => {
    setResetNav(setNav => setNav + 1)
  }

  const toggleCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <>
      <div className='navigation'>
        { isMobile ? null : isHome ? <div className='back-button'></div> : <BackButton /> }
        <Link to="/" onClick={handleNavigationClick}><div className='logo'>FASHIONISTA</div></Link>
        { !isMobile ?
            <div className='icons-container'>
            { currentUser ? (
            <>
              <Avatar onClick={handleOpenClick} className="auth-icon" style={{fontSize: '16px', backgroundColor: 'rgb(var(--primary-gradient))', border: 'white 2px solid', borderRadius: '50%'}} sx={{ width: 30, height: 30 }}>{ userInitials }</Avatar>
              <Popper disablePortal={true} open={open} anchorEl={anchorEl} placement="bottom">
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className='account-popper'>
                    <div onClick={handleFavorite} className='account-popper-elem'>
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
          : null}
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
      { isMobile ? <MobileNavigation resetNav={resetNav} /> : null}
    </>
  )
}

export default Navigation