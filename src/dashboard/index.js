import React from "react"
import Seo from "../components/Seo"
import { gql, useQuery } from "@apollo/client"


const GET_USER = gql`
  {
    viewer {
      firstName
      lastName
      email
    }
  }
`

const DashboardIndex = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER)

  const user = data && data.viewer

  return (
    <>
      <Seo title="Dashboard"/>
      <h2>Dashboard Index</h2>

      <div>
        Hello {data && user && (user.firstName ? user.firstName + " " + user.lastName : user.email)}
      </div>
    </>
  )
}

export default DashboardIndex
