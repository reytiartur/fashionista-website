import React, {useEffect, useState} from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './MobileNavigation.scss'

const MobileNavigation = ({ resetNav }) => {
    const [value, setValue] = useState('shop');
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext)

    const handleChange = (event, newValue) => {
      setValue(newValue);
      navigate(newValue);
      window.scrollTo(0, 0)
    };

    useEffect(() => {
      setValue("shop")
    }, [resetNav])

  return (
    <BottomNavigation className='mobile-navigation' sx={{ width: '100%' }} value={value} onChange={handleChange}>
      <BottomNavigationAction label="Favorites" value="favorite" icon={<FavoriteIcon />}/>
      <BottomNavigationAction label="Shop" value="shop" icon={<StorefrontIcon/>} />
      <BottomNavigationAction label="Cart" value="checkout" icon={<ShoppingCartIcon />} />
      { currentUser ? <BottomNavigationAction label="Profile" value="auth" icon={<AccountCircleIcon />} /> : <BottomNavigationAction label="Login" value="auth" icon={<LoginIcon />} /> }
    </BottomNavigation>
  )
}

export default MobileNavigation