import React, { useEffect } from 'react'
import { createContext, useState } from "react";



export const FilterContext = createContext({
    activeFilters: [], 
    setActiveFilters: () => {},
    filterPrice: [],
    setFilterPrice: () => {},
    checkedValue: {},
    setCheckedValue: () => {},
    filterOptions: {},
    chosenObjectCategory: ' ',
    setChosenObjectCategory: () => ' ',    
})

export const FilterProvider = ({ children }) => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [filterPrice, setFilterPrice] = useState({min: 0, max: 250})
    const [checkedValue, setCheckedValue] = useState({})
    const [chosenObjectCategory, setChosenObjectCategory] = useState('all')

    const filterOptions = {
        'size': ['s', 'm', 'l'],
        'color': ['black', 'white', 'grey', 'multi', 'brown', 'blue', 'green', 'red', 'orange', 'yellow', 'pink', 'beige'],
        'fit': ['regular fit', 'relaxed fit', 'slim fit', 'skinny fit', 'oversized'],
        'pattern': ['patterned', 'spotted', 'solid color'],
        'material': ['wool', 'cotton', 'leather', 'denim', 'satin'],
        'neckline': ['round neck', 'deep neckline', 'turtleneck', 'polo-neck', 'v-neck'],
        'sleeve length': ['3/4 sleeve', 'long sleeve', 'short sleeve', 'sleeveless'],
        'waist rise': ['high waist', 'low waist', 'regular waist'],
        'length': ['ankle length', 'cropped', 'regular', 'short', 'midi']
    }

    useEffect(() => {
        const filterValuesArray = Object.values(filterOptions).flat()
        filterValuesArray.map(filter => setCheckedValue(currentState => ({...currentState, [filter]: { ...currentState[filter], checked: false }})))
    }, [])

    const value = { activeFilters, setActiveFilters, filterPrice, setFilterPrice, checkedValue, setCheckedValue, filterOptions, chosenObjectCategory, setChosenObjectCategory }
    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}