import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'https://ancient-retreat-92970.herokuapp.com/',
  fetch,
});

//Set JSON Web Token to the headers
const authLink = setContext((_, { headers }) => {

  //Get token from localStorage
  const token = window.localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat( httpLink ),
});

export default client;