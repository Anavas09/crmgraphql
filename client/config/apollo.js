import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
  fetch
});

//Set JSON Web Token to the headers
const authLink = setContext((_, { headers }) => {

  //Get token from localStorage
  const token = window.localStorage.getItem('token');

  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : ''
  };
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat( httpLink ),
});

export default client;