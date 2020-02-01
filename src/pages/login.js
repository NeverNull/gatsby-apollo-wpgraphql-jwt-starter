import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import LoginForm from "../components/LoginForm"
import { isAuthenticated } from "../services/auth"
import { navigate } from "gatsby"

const Login = () => {
  if (isAuthenticated()) {
    navigate(`/dashboard/`)
  }

  return (
    <Layout>
      <Seo title="Login"/>
      <h1>Login</h1>
      <LoginForm />
    </Layout>
  )
}

export default Login
