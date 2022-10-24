import React from 'react'
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  currentUser: null, 
  setCurrentUser: () => null,
  isHome: false, 
  setIsHome: () => '',
  isMobile: ' ',
  setIsMobile: () => ' '
})
 
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isHome, setIsHome] = useState(false);
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth <= 1240) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  useEffect(() => {
    handleResize();
  }, [])

  const value = { currentUser, setCurrentUser, isHome, setIsHome, isMobile, setIsMobile, handleResize }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}