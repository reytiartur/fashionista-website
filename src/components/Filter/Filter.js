import React, { useEffect, useState, useContext, Fragment } from 'react'
import './Filter.scss'
import { Divider } from '@mui/material';
import { Slider } from '@mui/material';
import FilterOption from '../FilterOption/FilterOption';
import { FilterContext } from '../../context/FilterContext';
import { ProductsContext } from '../../context/ProductsContext';


    

const Filter = () => {
    const [filterMinPrice, setFilterMinPrice] = useState(0)
    const [filterMaxPrice, setFilterMaxPrice] = useState(250)
    const { filterPrice, setFilterPrice, filterOptions } = useContext(FilterContext)
    const { min, max } = filterPrice

    const { prevFilteredProducts, filteredProducts } = useContext(ProductsContext)

    useEffect(() => {
        setFilterMinPrice(min)
        setFilterMaxPrice(max)
        prevFilteredProducts.beforeFilter = filteredProducts;
    }, [])

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
                    <Slider sx={{color:"#ffba7e", width: '70%'}} onChange={handleSliderChange} value={[min, max]} valueLabelDisplay="on" disableSwap min={0} max={250} />  
                </div>
                <Divider />
                <div className='filter-list'>
                    {Object.entries(filterOptions).map((filter, i) => {
                        return (
                            <FilterOption key={`${filter[0]}${i}`} className='filter-option' filterName={filter[0]} filterValue={filter[1]} />
                        )
                    })}
                </div>
            
        </div>   
    )
}

export default Filter