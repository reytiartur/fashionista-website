import React from 'react'
import { Link } from 'react-router-dom'
import Categories from '../Categories/Categories'
import './Home.scss'
import NewCollection from '../NewCollection/NewCollection'


const Home = () => {
  return (
    <div className='homepage'>
        <NewCollection />
        <Categories />
    </div>
  )
}

export default Home