import { gql } from '@apollo/client';

const AUTH_USER = gql`
  mutation authUser($input: AuthUserInput) {
    authUser(input: $input) {
      token
    }
  }
`;

const NEW_ACCOUNT = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      id
      name
      lastname
      age
      email
    }
  }
`;

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastname
      email
      company
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      id
      name
      lastname
      email
      company
    }
  }
`;

export {
  AUTH_USER,
  DELETE_CLIENT,
  NEW_ACCOUNT,
  NEW_CLIENT,
  UPDATE_CLIENT
}