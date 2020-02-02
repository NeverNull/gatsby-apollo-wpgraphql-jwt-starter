import React, { useMemo, useState } from "react"
import { AuthContext } from "./AuthContext"
import { gql, useMutation } from "@apollo/client"
import { setRefreshToken } from "../src/services/auth"
import { navigate } from "gatsby"
import uuid from "uuid"


const LOGIN_USER = gql`
    mutation LoginUser($input: LoginInput!) {
        login(input: $input) {
            user {
                jwtAuthToken
                jwtRefreshToken
                jwtAuthExpiration
                username
                nicename
            }
        }
    }
`

export const AuthProvider = ({ children }) => {
  const [loginUser, { data: loginData }] = useMutation(LOGIN_USER)
  const [userData, setUserData] = useState(null)

  const providerValue = useMemo(() => (
    {
      loginUser: ({ username, password }) => loginUser({
        variables: {
          input: {
            clientMutationId: uuid(),
            username: username,
            password: password,
          },
        },
      }).then((response) => {
        console.log("Response", response)
        // console.log("Data", data)
        const { login } = response.data
        const user = (login && login.user) ? login.user : {}

        setRefreshToken(user, () => navigate("/dashboard/"))
      }),
      loginData: loginData,
      userData: userData,
      setUserData: setUserData
    }
  ), [loginUser, loginData, userData, setUserData])


  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}
