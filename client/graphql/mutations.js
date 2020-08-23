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

export {
  AUTH_USER,
  NEW_ACCOUNT,
  NEW_CLIENT
}