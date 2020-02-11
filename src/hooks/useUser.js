import React, { createContext, useContext, useState } from "react"

const UserContext = createContext(null)

export const UserProvider = ({ children }) => (
  <UserContext.Provider value={useProvideUser()}>
    {children}
  </UserContext.Provider>
)

export const useUser = () => useContext(UserContext)


const useProvideUser = () => {
  const [user, setUser] = useState({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
  })

  return [
    user,
    setUser,
  ]
}
