import decode from "jwt-decode"


let inMemoryAuthTokenDefault = {
  authToken: null,
  authExpiration: null,
}

let inMemoryAuthToken = inMemoryAuthTokenDefault


// Local Storage Key
export const REFRESH_TOKEN_KEY = `REFRESH_TOKEN`
export const LOGGED_OUT_KEY = `LOGGED_OUT_TIME`


// Helper
export const isBrowser = typeof window !== `undefined`

// TODO: Check if these work as expected
export const isTokenExpired = authToken => {
  return authToken ? Date.now() - decode(authToken).exp  < 1000 : true
}

export const isLoggedOut = () => {
  const loggedOutTime = getLoggedOutTime()
  return loggedOutTime && loggedOutTime <= Date.now()
}


// Methods

export const deleteRefreshToken = () => {
  if (!isBrowser) return null
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const logout = (callback) => {
  inMemoryAuthToken = inMemoryAuthTokenDefault
  deleteRefreshToken()
  setLoggedOutTime()

  if (callback) {
    callback()
  }
}


// Setter

export const setAuthToken = (authToken) => {
  if (!isBrowser) return
  if (!authToken) {
    console.log("[setAuthToken]", `Auth Token or Auth Expiration shouldn't be ${authToken}.`)
    return
  }
  inMemoryAuthToken = {authToken, authExpiration: decode(authToken).exp}
}

export const setRefreshToken = (refreshToken, callback) => {
  if (!isBrowser) return
  if (!refreshToken) {
    // console.log("[setRefreshToken]", `Refresh token shouldn't be ${refreshToken}.`)
    return
  }

  localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(refreshToken))
  localStorage.removeItem(LOGGED_OUT_KEY)

  // console.log("setRefreshToken", inMemoryAuthToken)

  if (callback) {
    callback()
  }
}

export const setLoggedOutTime = () => {
  if (!isBrowser) return
  localStorage.setItem(LOGGED_OUT_KEY, JSON.stringify(Date.now()))
}


// Getter

export const getInMemoryAuthToken = () => {
  if (!isBrowser) return null
  return inMemoryAuthToken.authToken
}

export const getAuthTokenExpiration = () => {
  if (!isBrowser) return null
  return inMemoryAuthToken.authExpiration
}

export const getRefreshToken = () => {
  if (!isBrowser) return null
  return JSON.parse(localStorage.getItem(REFRESH_TOKEN_KEY))
}

export const getLoggedOutTime = () => {
  if (!isBrowser) return null
  return JSON.parse(localStorage.getItem(LOGGED_OUT_KEY))
}




