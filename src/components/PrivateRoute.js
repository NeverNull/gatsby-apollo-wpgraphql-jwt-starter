import React from "react"
import { navigate } from "gatsby"
import { isBrowser } from "../services/auth"
import { useAuth } from "../hooks/useAuth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const auth = useAuth()

  if (!auth.isLoggedIn() && isBrowser && window.location.pathname !== `/login/`) {
    navigate(`/dashboard/login/`, {replace: true})
    return null
  }

  return <Component {...rest} />
}
export default PrivateRoute
