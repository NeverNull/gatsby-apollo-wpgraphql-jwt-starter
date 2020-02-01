import React, { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import useFormFields from "../hooks/useFormFields"

const labelStyle = {
  marginTop: 16
}

const LoginForm = () => {
  const authContext = useContext(AuthContext)

  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    authContext.loginUser({
        username: fields.username,
        password: fields.password,
      },
    )
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
