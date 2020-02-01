import React from "react"

import Seo from "../components/Seo"
import SignUpForm from "../components/SignUpForm"
import Layout from "../components/Layout"
import { isAuthenticated } from "../services/auth"
import { navigate } from "gatsby"

const SignUp = () => {
  if (
    isAuthenticated()
  ) {
    // If we’re not logged in, redirect to the home page.
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
