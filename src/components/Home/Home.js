import React, { useContext, useEffect, useState } from 'react'
import Categories from '../Categories/Categories'
import './Home.scss'
import NewCollection from '../NewCollection/NewCollection'
import { UserContext } from '../../context/UserContext'



const Home = () => {
  const { isHome, setIsHome } = useContext(UserContext);

  useEffect(() => {
    setIsHome(true)
  }, [])

  useEffect(() => {
    return () => setIsHome(false)
  }, [])

  return (
    <div className='homepage'>
        <NewCollection />
        <Categories />
    </div>
  )
}

export default Home