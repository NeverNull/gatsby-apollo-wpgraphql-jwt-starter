import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import useFormFields from "../hooks/useFormFields"
import { getUuid } from "../services/utilities"
import { setJwt } from "../services/auth"


const REGISTER_USER = gql`
    mutation RegisterUser($input: RegisterUserInput!) {
        registerUser(input: $input) {
            user {
                jwtAuthToken
                jwtRefreshToken
                jwtAuthExpiration
                isJwtAuthSecretRevoked
            }
        }
    }
`

const labelStyle = {
  marginTop: 16
}

const SignUpForm = () => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [registerUser, { data }] = useMutation(REGISTER_USER)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    await registerUser({
      variables: {
        input: {
          clientMutationId: getUuid(),
          username: fields.email,
          firstName: fields.firstName || null,
          lastName: fields.lastName || null,
          email: fields.email,
          password: fields.password,
        },
      },
    }).then((response) => {
      // console.log("Response", data)

      setJwt(response.data.registerUser.user)
      setIsLoading(false)
    })
  }

  return <form method="post" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
    {isLoading ? "isLoading" : "is not loading ..."}
    <div style={{display: "flex", flexDirection: "column"}}>

      <label htmlFor="email" style={labelStyle}><b>Email</b></label>
      <input style={{ marginRight: 16 }} type="email" placeholder="Enter Email" name="email"
             onChange={handleFieldChange} value={fields.email} required/>

      <label htmlFor="firstName" style={labelStyle}><b>FirstName</b></label>
      <input style={{ marginRight: 16 }} type="firstName" placeholder="Enter FirstName" name="firstName"
             onChange={handleFieldChange} value={fields.firstName} />

      <label htmlFor="lastName" style={labelStyle}><b>LastName</b></label>
      <input style={{ marginRight: 16 }} type="lastName" placeholder="Enter LastName" name="lastName"
             onChange={handleFieldChange} value={fields.lastName}/>

      <label htmlFor="password" style={labelStyle}><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" onChange={handleFieldChange}
             value={fields.password} required/>
    </div>

    <button style={{ margin: "16px 0" }} type="submit" >Register</button>
  </form>
}

export default SignUpForm
