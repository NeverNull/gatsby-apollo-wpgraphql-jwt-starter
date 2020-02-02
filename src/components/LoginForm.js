import React, { useEffect } from "react"
import useFormFields from "../hooks/useFormFields"
import { gql, useMutation } from "@apollo/client"
import uuid from "uuid"
import { setAuthToken, setRefreshToken } from "../services/auth"
import { navigate } from "gatsby"
import { useAuth } from "../hooks/useAuth"

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
      user {
        jwtAuthExpiration
      }
    }
  }
`

const labelStyle = {
  marginTop: 16
}

const LoginForm = () => {
  const auth = useAuth();

  useEffect(() => {

    if (auth.isLoggedIn()) {
      navigate(`/dashboard/`, {replace: true})
    }
  }, [auth])

  const [loginUser, { data: loginData }] = useMutation(LOGIN_USER)

  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    loginUser({
      variables: {
        input: {
          clientMutationId: uuid(),
          username: fields.username,
          password: fields.password,
        },
      },
    }).then((response) => {
      console.log("Response", response)
      const { login } = response.data
      const authExpiration = login.user ? login.user.jwtAuthExpiration : null

      if(login) {
        setAuthToken(login.authToken, authExpiration)
        setRefreshToken(login.refreshToken, () => navigate("/dashboard/"))
      }
    })
  }

  return (
    <form method="post" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          onSubmit={handleSubmit}>
      <div style={{display: "flex", flexDirection: "column"}}>
        <label htmlFor="username" style={labelStyle}><b>Email</b></label>
        <input onChange={handleFieldChange} value={fields.username} style={{ marginRight: 16 }} type="text"
               placeholder="Enter username" name="username" required/>

        <label htmlFor="password" style={labelStyle}><b>Password</b></label>
        <input onChange={handleFieldChange} value={fields.password} type="password" placeholder="Enter Password"
               name="password" required/>
      </div>

      <button style={{ margin: "16px 0" }} type="submit">Login</button>
    </form>
  )
}


export default LoginForm
