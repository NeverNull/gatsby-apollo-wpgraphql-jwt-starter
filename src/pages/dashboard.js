import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import UserArea from "../dashboard/UserArea"
import Layout from "../components/Layout"
import DashboardIndex from "../dashboard"
import { Link, navigate } from "gatsby"
import { logout } from "../services/auth"

import LoginForm from "../components/LoginForm"
import SignUpForm from "../components/SignUpForm"
import { useAuth } from "../hooks/useAuth"
import PageNotFound from "../dashboard/PageNotFound"
import { UserProvider } from "../hooks/useUser"

// TODO: somehow make sure, the Dashboard is not flicking when trying to access it without being logged in

const Dashboard = () => {
  const auth = useAuth()
  return (
    <Layout>

      <hr/>

      {
        auth.isLoggedIn() &&
        <>
          <h2>Dashboard</h2>
          <nav>
            <Link to={"/dashboard/"}>Dashboard</Link> {" | "}
            <Link to={"/dashboard/userarea/"}>User Area</Link> {" | "}
            <a
              href="/"
              onClick={event => {
                event.preventDefault()
                logout(() => navigate(`/dashboard/`))
              }}
            >
              log out
            </a>
          </nav>
        </>
      }

      {/* This also defines the space, where the routes get rendered */}
      <div className={"DashboardMain"} style={{ backgroundColor: "#f9f9f9", padding: 16 }}>
        <UserProvider>
          <Router id="router">
            <PageNotFound default/>
            <LoginForm path="/dashboard/login/"/>
            <SignUpForm path="/dashboard/signup/"/>
            <PrivateRoute path="/dashboard/" component={DashboardIndex}/>
            <PrivateRoute path="/dashboard/userarea/" component={UserArea}/>
          </Router>
        </UserProvider>
      </div>

    </Layout>
  )
}

export default Dashboard
