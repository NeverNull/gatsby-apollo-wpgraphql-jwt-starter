let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const fetch = require('isomorphic-fetch');
const fs = require('fs');

const createPossibleTypes = () => {
  return new Promise((resolve) => {
    fetch(process.env.GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variables: {},
        query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
      }),
    }).then(result => result.json())
      .then(result => {
        const possibleTypes = {};

        result.data.__schema.types.forEach(supertype => {
          if (supertype.possibleTypes) {
            possibleTypes[supertype.name] =
              supertype.possibleTypes.map(subtype => subtype.name);
          }
        });

        fs.writeFile('./apollo/possibleTypes.json', JSON.stringify(possibleTypes), err => {
          if (err) {
            console.error('Error writing possibleTypes.json', err);
          } else {
            console.log('Fragment types successfully extracted!');
            resolve()
          }
        });
      });
  })
}

createPossibleTypes()
