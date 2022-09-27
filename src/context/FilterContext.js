import React from 'react'
import { createContext, useState } from "react";



export const FilterContext = createContext({
    activeFilters: [], 
    setActiveFilters: () => {},
    filterPrice: [],
    setFilterPrice: () => {},
    checkedValue: {},
    setCheckedValue: () => {},
})

export const FilterProvider = ({ children }) => {
    const [activeFilters, setActiveFilters] = useState([]);
    const [filterPrice, setFilterPrice] = useState({min: 0, max: 250})
    const [checkedValue, setCheckedValue] = useState({})
    const value = { activeFilters, setActiveFilters, filterPrice, setFilterPrice, checkedValue, setCheckedValue }
    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}