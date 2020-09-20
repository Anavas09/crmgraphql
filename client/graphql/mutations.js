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

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput) {
    updateOrder(id: $id, input: $input) {
      status
    }
  }
`;

const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      price
      stock
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      stock
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export {
  AUTH_USER,
  DELETE_CLIENT,
  NEW_ACCOUNT,
  NEW_CLIENT,
  UPDATE_CLIENT,
  NEW_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  NEW_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
}