import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client"
import { TokenRefreshLink } from "apollo-link-token-refresh"
import { onError } from "apollo-link-error"
import fetch from "isomorphic-fetch"
import uuid from "uuid"

import possibleTypes from "./possibleTypes.json"
import {
  deleteRefreshToken,
  getInMemoryAuthToken,
  getRefreshToken,
  isTokenExpired,
  logout,
  setAuthToken,
} from "../src/services/auth"
import { navigate } from "gatsby"


const httpLink = new HttpLink(
  {
    uri: process.env.GRAPHQL_URL,
    fetch,
    // credentials: 'include',
  }
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = getInMemoryAuthToken().authToken

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })

  return forward(operation)
})

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: `refreshJwtAuthToken`,
  isTokenValidOrUndefined: () => {
    const token = getInMemoryAuthToken().authToken
    return !token || (token && !isTokenExpired(token))
  },
  fetchAccessToken: () => {
    console.log("refreshTokenLink")
    // TODO: Check if refreshJwtAuthToken can return authExpiration
    const query = `
          mutation RefreshJWTAuthToken($input: RefreshJwtAuthTokenInput!) {
            refreshJwtAuthToken(input: $input) {
              authToken
            }
          }
        `
    return fetch(process.env.GRAPHQL_URL, {
      method: "POST",
      mode: "cors",
      // credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            jwtRefreshToken: getRefreshToken(),
            clientMutationId: uuid(),
          },
        },
      }),
    })
  },
  handleFetch: response => {
    if (response.errors && response.errors.length) return
    console.log("HandleFetch", response)
    setAuthToken(response.authToken)
  },
  // handleResponse: (operation, accessTokenField) => response => {
  //   console.log("HandleResponse:", response)
  // },
  handleError: err => {
    console.error(err)
    deleteRefreshToken()
  },
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions && extensions.code === "invalid-jwt") {
        logout(() => navigate("/dashboard/"))
      }
      console.log(`[GraphQL error]:`, {Message: message, Location: locations, Path: path, Extension: extensions})
    })
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

export const client = new ApolloClient({
  link: from([
    authMiddleware,
    onErrorLink,
    refreshTokenLink,
    httpLink
  ]),
  cache: new InMemoryCache({ possibleTypes }),
})
