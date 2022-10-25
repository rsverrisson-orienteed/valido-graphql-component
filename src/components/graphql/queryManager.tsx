import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const QueryManager = (props: any) => {
  const [client, setClient] = useState(() => {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: props.token ? props.token : "",
        }
      }
    });
    const httpLink = createHttpLink({ uri: props.apiUrl });
    const graphQlClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
    return graphQlClient;
  })

  const query = gql`
query {
  listOrgs {
    items {
      name
    }
  }
}
`

  const handleClick = () => {
    console.log("Sending query...");
    client.query({ query }).then(res => console.log(res));
  }

  return (
    <button onClick={handleClick}>Send Query!</button>
  )
}

export default QueryManager;
