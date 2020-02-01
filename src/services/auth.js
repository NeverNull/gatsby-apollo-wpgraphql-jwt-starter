import decode from "jwt-decode"

export const JWT_KEY = `JwtToken`

export const isBrowser = typeof window !== `undefined`
export const isTokenExpired = token => decode(token).exp <= Date.now() / 1000
export const deleteJwt = () => localStorage.removeItem(JWT_KEY)

export const logout = (callback) => {
  deleteJwt()

  if (callback) {
    callback()
  }
}

export const isAuthenticated = () => {
  return getJwt() !== null
}

// Setter

export const setJwt = (jwt, callback) => {
  localStorage.setItem(JWT_KEY, JSON.stringify(jwt))

  if (callback) {
    callback()
  }
}

export const setAuthToken = jwtAuthToken => {
  const jwt = getJwt()
  jwt && setJwt({ ...jwt, jwtAuthToken })
}


// Getter

export const getJwt = () => {
  if (!isBrowser) return null
  return JSON.parse(localStorage.getItem(JWT_KEY))
}
export const getAuthToken = () => (getJwt() || {}).jwtAuthToken || null
export const getRefreshToken = () => (getJwt() || {}).jwtRefreshToken || null
export const getUser = () => (getJwt() || {}).user || null




