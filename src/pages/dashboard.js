import React from "react"
import { Router } from "@reach/router"
import Login from "./login"
import SignUp from "./signup"
import PrivateRoute from "../components/PrivateRoute"
import UserArea from "../dashboard/UserArea"
import Layout from "../components/Layout"
import DashboardIndex from "../dashboard"
import { Link, navigate } from "gatsby"
import { logout } from "../services/auth"

const Dashboard = () => {

  return (
    <Layout>
      <h1>Dashboard</h1>


      <nav>
        <Link to={"/dashboard/"}>Dashboard</Link> {" | "}
        <Link to={"/dashboard/userarea/"}>User Area</Link> {" | "}
        <a
          href="/"
          onClick={event => {
            event.preventDefault()
            logout(() => navigate(`/login/`))
          }}
        >
          log out
        </a>
      </nav>

      {/* This also defines the space, where the routes get rendered */}
      <div className={"DashboardMain"} style={{backgroundColor: '#eee', padding: 16}}>
        <Router id="router">
          <Login path="/login/" />
          <SignUp path="/signup/" />
          <PrivateRoute path="/dashboard/" component={DashboardIndex} />
          <PrivateRoute path="/dashboard/userarea/" component={UserArea} />
        </Router>
      </div>

    </Layout>
  )
}

export default Dashboard
