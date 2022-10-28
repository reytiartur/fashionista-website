import React from 'react'
import ShopItem from '../ShopItem/ShopItem';
import { useContext, useState } from 'react';
import './RecommendedCarousel.scss'
import { UserContext } from '../../context/UserContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RecommendedCarousel = ({ recommendedArray, exactProduct }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { isMobile } = useContext(UserContext)

    const handlePrev = () => {
        if(currentIndex > 0) {
            setCurrentIndex(currentIndex => currentIndex - 1)
        }
    }

    const handleNext = () => {
        if(currentIndex < 4) {
            setCurrentIndex(currentIndex => currentIndex + 1)
        }
    }


  return (
    <div className="carousel-wrapper">
        {!isMobile && <ArrowBackIosIcon onClick={handlePrev} className="left-arrow" />}
        <div className='carousel-content-wrapper'>           
            <div className='recommended-products' style={{ transform: `translateX(-${currentIndex * 236}px)` }}>
                {recommendedArray?.filter(product => product.id !== exactProduct?.id).slice(0, 8).map(product => {
                return(
                    <ShopItem product={product} key={product.name} />
                )
                })}
            </div>   
        </div>
        {!isMobile && <ArrowForwardIosIcon onClick={handleNext} className="right-arrow" />}
    </div>

  )
}

export default RecommendedCarousel