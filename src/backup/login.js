import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import LoginForm from "../components/LoginForm"
import { navigate } from "gatsby"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const auth = useAuth();

  if (auth.isLoggedIn()) {
    navigate(`/dashboard/`, {replace: true})
    return null
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
