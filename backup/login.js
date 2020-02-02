import React from "react"

import Layout from "../src/components/Layout"
import Seo from "../src/components/Seo"
import LoginForm from "../src/components/LoginForm"
import { navigate } from "gatsby"
import { useAuth } from "../src/hooks/useAuth"

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
