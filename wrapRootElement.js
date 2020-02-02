import React from "react"
import { client } from "./apollo/client"

import { AuthProvider } from "./src/hooks/useAuth"
import { ApolloProvider } from "@apollo/client"

// eslint-disable-next-line react/display-name,react/prop-types
export const wrapRootElement = ({element}) => {
  return <ApolloProvider client={client}>
      <AuthProvider>
        {element}
      </AuthProvider>
    </ApolloProvider>
}
