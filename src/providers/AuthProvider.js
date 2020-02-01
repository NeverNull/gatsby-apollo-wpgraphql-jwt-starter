import React, { useMemo, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { gql, useMutation } from "@apollo/client"
import { getUuid } from "../services/utilities"
import { setJwt } from "../services/auth"
import { navigate } from "gatsby"

const LOGIN_USER = gql`
    mutation LoginUser($input: LoginInput!) {
        login(input: $input) {
            user {
                jwtAuthToken
                jwtRefreshToken
                jwtAuthExpiration
                isJwtAuthSecretRevoked
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
            clientMutationId: getUuid(),
            username: username,
            password: password,
          },
        },
      }).then(({ data }) => {
        const { login } = data
        const user = (login && login.user) ? login.user : {}

        setJwt(user, () => navigate("/dashboard/"))
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
