import { gql } from '@apollo/client';

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
  GET_CLIENTS_SELLER,
  GET_USER
}