import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.error("Network Error:", networkError.message);
    // Handle network errors globally
  }
});

const client = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
