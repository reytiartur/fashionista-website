import React, { useEffect, useState, useContext, Fragment } from 'react'
import './Filter.scss'
import { Divider } from '@mui/material';
import { Slider } from '@mui/material';
import FilterOption from '../FilterOption/FilterOption';
import { FilterContext } from '../../context/FilterContext';



    

const Filter = () => {
    const [filterMinPrice, setFilterMinPrice] = useState(0)
    const [filterMaxPrice, setFilterMaxPrice] = useState(250)
    const { filterPrice, setFilterPrice } = useContext(FilterContext)
    const { min, max } = filterPrice

    const { filterOptions } = useContext(FilterContext)



    const handleSliderChange = (event, newValue) => {
        setFilterMinPrice(+newValue[0]) 
        setFilterMaxPrice(+newValue[1])
    };

    useEffect(() => {
        setFilterPrice({min: +filterMinPrice, max: +filterMaxPrice})
    }, [filterMinPrice, filterMaxPrice])


    return (
        <div className='filter'>
            <div className="price-filter">
                <p>Price: </p>
                <Slider onChange={handleSliderChange} value={[min, max]} valueLabelDisplay="on" disableSwap style={{width:"70%"}} min={0} max={250} />  
            </div>
            <Divider />
            <ul className='filter-list'>
                {Object.entries(filterOptions).map((filter, i) => {
                    return (
                        <Fragment key={`${filter[0]}${i}`}>
                            <FilterOption className='filter-option' filterName={filter[0]} filterValue={filter[1]} />
                            <Divider key={`${i}${Math.random()}`} />
                        </Fragment>
                    )
                })}
            </ul>
        </div>   
    )
}

export default Filter