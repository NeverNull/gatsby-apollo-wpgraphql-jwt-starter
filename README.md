# Gatsby Apollo WPGraphQL JWT Starter

This project aims to serve as a good starting point, to handle user registration and login with Apollo, WPGraphQL and WPGraphQL JWT Authentication.

We gonna use the following libraries for now:

- [WPGraphQL](https://github.com/wp-graphql/wp-graphql) - `v0.5.1` - [[Docs](https://docs.wpgraphql.com/)]
- [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication) - `v0.3.3` - [[Docs](https://docs.wpgraphql.com/extensions/wpgraphql-jwt-authentication/)]
- [Apollo Client 3](https://github.com/apollographql/apollo-client/tree/master) - `3.0.0-beta.31` - [[Docs](https://www.apollographql.com/docs/react/v3.0-beta)]


WPGraphQL will be updated, as soon as some bugs are fixed. Also Apollo v3 might change from beta to a stable release.

## 🚀 Quick start

### WordPress

1.  **Install plugins**

    Download the .zip files and install through the WordPress Admin or if you can run git, just run the following commands inside your `./wp-content/plugins/` folder:

    ```
    git clone --branch v0.5.1 https://github.com/wp-graphql/wp-graphql.git
    git clone --branch v0.3.3 https://github.com/wp-graphql/wp-graphql-jwt-authentication.git
    ```

2. **Check your permalinks**

    Make sure your graphql endpoint works as expected.
    
    See these docs: https://docs.wpgraphql.com/getting-started/install-and-activate/#verify-the-endpoint-works

### Gatsby

1.  **Install modules**

    Run yarn to install packages. Also after the modules are installed it should run `createPossibleType.js` automatically on `postinstall`.

    ```shell
    yarn
    ```
    
    Check if the file `./apollo/possibleTypes.json` has been created.
    
2. **Add .env.development**

    There is an `.env.development.example` which you can use and rename. Make sure you have a `.env.development` in your root folder.
    
    ```dotenv
    GRAPHQL_URL=http://your-domain/graphql
    
    ```
   
    If you run `yarn run build` you need a `.env.production` in you root folder. Or you run it in your CI wit CI-Variables.

3.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```shell
    yarn run develop
    ```
    
    or
    
    ```shell
    yarn run cdev
    ```
    
    `cdev` runs `gatsby clean` before running develop

4.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!


