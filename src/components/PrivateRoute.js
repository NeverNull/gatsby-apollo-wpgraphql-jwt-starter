import React from "react"
import { navigate } from "gatsby"
import { isAuthenticated, isBrowser } from "../services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {

  if (!isAuthenticated() && isBrowser && window.location.pathname !== `/login/`) {
    navigate(`/login/`)
    return null
  }

  return <Component {...rest} />

}
export default PrivateRoute
