import React from 'react'
import { Link } from 'react-router-dom'
import Categories from '../Categories/Categories'
import './Home.scss'


const Home = () => {
  return (
    <div className='homepage'>
        <Link className='new'></Link>
        <Categories />
    </div>
  )
}

export default Home