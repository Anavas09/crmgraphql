import { gql } from '@apollo/client';

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      name
      lastname
      company
      email
      phone
    }
  }
`;

const GET_CLIENTS_SELLER = gql`
  {
    getClientsSeller {
      id
      name
      lastname
      company
      email
    }
  }
`;

const GET_USER = gql`
  {
    getUser {
      id
      name
      lastname
    }
  }
`;

export {
  GET_CLIENT,
  GET_CLIENTS_SELLER,
  GET_USER
}