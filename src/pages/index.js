import React from "react"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home"/>
    <h1>Gatsby Apollo WPGraphQL JWT Starter</h1>

    <p>This project aims to serve as a good starting point, to handle user registration and login with Apollo, WPGraphQL and
      WPGraphQL JWT Authentication.</p>

    Find more info here: <a href="https://github.com/NeverNull/gatsby-apollo-wpgraphql-jwt-starter" target="_blank" rel="noopener noreferrer">https://github.com/NeverNull/gatsby-apollo-wpgraphql-jwt-starter</a>

  </Layout>
)

export default IndexPage
