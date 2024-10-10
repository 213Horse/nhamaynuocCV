import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL,
});

const cache = new InMemoryCache();

// authentication
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default apolloClient;
