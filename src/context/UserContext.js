import React from 'react'
import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: null, 
  setCurrentUser: () => null,
  isHome: false, 
  setIsHome: () => '',
})
 
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isHome, setIsHome] = useState(false);

  const value = { currentUser, setCurrentUser, isHome, setIsHome }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}