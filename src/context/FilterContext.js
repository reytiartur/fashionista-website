import React from 'react'
import { createContext, useState } from "react";



export const FilterContext = createContext({
    activeFilters: [], 
    setActiveFilters: () => {},
    filterPrice: [],
    setFilterPrice: () => {},
    checkedValue: {},
    setCheckedValue: () => {},
    filterOptions: {},
})

export const FilterProvider = ({ children }) => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [filterPrice, setFilterPrice] = useState({min: 0, max: 250})
    const [checkedValue, setCheckedValue] = useState({})

    const filterOptions = {
        'size': ['s', 'm', 'l'],
        'color': ['black', 'white', 'pink', 'beige'],
        'fit': ['relaxed fit','slim fit', 'skinny fit', 'oversize'],
        'pattern': ['patterned', 'spotted', 'solid color'],
        'material': ['wool', 'cotton', 'leather', 'denim', 'satin']
    }

    const value = { activeFilters, setActiveFilters, filterPrice, setFilterPrice, checkedValue, setCheckedValue, filterOptions }
    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}