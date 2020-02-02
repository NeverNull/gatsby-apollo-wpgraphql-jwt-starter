import React from "react"

import Seo from "../src/components/Seo"
import SignUpForm from "../src/components/SignUpForm"
import Layout from "../src/components/Layout"
import { navigate } from "gatsby"
import { useAuth } from "../src/hooks/useAuth"

const SignUp = () => {
  const auth = useAuth();

  if (auth.isLoggedIn()) {
    navigate(`/dashboard/`, {replace: true})
    return null
  }

  return (
    <Layout>
      <Seo title="Sign Up"/>
      <h1>Sign Up</h1>
      <SignUpForm />
    </Layout>
  )
}

export default SignUp
