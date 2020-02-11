import React, { createContext, useContext, useEffect } from "react"
import {
  getInMemoryAuthToken,
  getRefreshToken,
  isLoggedOut,
  isTokenExpired,
  LOGGED_OUT_KEY,
  logout,
  setAuthToken,
} from "../services/auth"
import { gql, useMutation } from "@apollo/client"
import useNetwork from "./useNetwork"
import { navigate } from "gatsby"
import uuid from "uuid"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={useProvideAuth()}>
    {children}
  </AuthContext.Provider>
)

export const useAuth = () => useContext(AuthContext)

const syncLoginStatus = (event) => {
  if (event.key === LOGGED_OUT_KEY && isLoggedOut()) {
    logout(navigate("/dashboard/"))
  }
}

const REFRESH_TOKEN = gql`
  mutation LoginUser($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
`

const useProvideAuth = () => {
  const [refreshToken, { data }] = useMutation(REFRESH_TOKEN)

  const isOnline = useNetwork()

  // const isAuthTokenExpired = () =>
  //   getInMemoryAuthToken().authToken && isTokenExpired(getInMemoryAuthToken().authToken)

  const isLoggedIn = () =>
    getInMemoryAuthToken() && !isTokenExpired(getInMemoryAuthToken())

  useEffect(() => {
    // TODO: This should only happen in one place. Either we implement an
    //       interval here, or we use the apollo-link-token-refresh in client.js
    if (isOnline && getRefreshToken()) {
      refreshToken({
        variables: {
          input: {
            clientMutationId: uuid(),
            jwtRefreshToken: getRefreshToken(),
          },
        },
      }).then((response) => {
        console.log("silentRefresh", response)
        const token = response.data.refreshJwtAuthToken ? response.data.refreshJwtAuthToken.authToken : null
        if (token) {
          setAuthToken(response.data.refreshJwtAuthToken.authToken)
        }
      })
    }
  }, [refreshToken])


  /**
   * Make sure, User is logged out on all Tabs
   */
  useEffect(() => {
    window.addEventListener("storage", syncLoginStatus)

    return () => {
      window.removeEventListener("storage", syncLoginStatus)
    }
  })

  // TODO: this still needs to be implemented properly
  // useEffect(() => {
  //   console.log("useEffect called")
  //   if (isAuthTokenExpired() && isOnline) {
  //     console.log("Triggered Token Refresh")
  //     /**
  //      * Execute an arbitrary query to trigger auth token refresh,
  //      * then sync local storage with auth context.
  //      */
  //     client
  //     .query({
  //       query: gql`
  //         {
  //           generalSettings {
  //             title
  //           }
  //         }
  //       `,
  //     })
  //   }
  // })

  return {
    isLoggedIn,
    // user: token ? token.user : null,
  }
}

