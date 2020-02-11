import React, { useEffect } from "react"
import Seo from "../components/Seo"
import { gql, useQuery } from "@apollo/client"
import { useUser } from "../hooks/useUser"
import ProgressLoader from "../components/ProgressLoader"


const GET_USER = gql`
  {
    viewer {
      firstName
      lastName
      email
      username
    }
  }
`

const DashboardIndex = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER)
  const [user, setUser] = useUser();


  useEffect(() => {
    if (data) {
      setUser({
        ...user,
        username: data.viewer.username,
        firstName: data.viewer.firstName,
        lastName: data.viewer.lastName,
        email: data.viewer.email,
      })
    }

  }, [data])

  if (loading) return <ProgressLoader/>

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
