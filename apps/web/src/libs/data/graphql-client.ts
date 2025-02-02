import { ApolloClient, InMemoryCache } from '@apollo/client';

const gqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPH_QL_URL,
  cache: new InMemoryCache(),
});

export { gqlClient };
