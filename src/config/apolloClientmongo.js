import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httpLink = new HttpLink({
  uri: "https://api-awa-v2.amazingtech.vn/graphql/mongo",
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClientMongo = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default apolloClientMongo;
