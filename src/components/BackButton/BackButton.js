import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BackButton.scss'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BackButton = () => {
    const navigate = useNavigate()
    const handleReturn = () => {
        navigate(-1)
    }
  return (
    <button className='back-button' onClick={handleReturn}><ArrowBackIosIcon /><span>BACK</span></button>
  )
}

export default BackButton