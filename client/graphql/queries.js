import { gql } from '@apollo/client';

const GET_BEST_SELLERS = gql`
  {
    getBestSellers {
      seller {
        name
        lastname
        email
      }
      total
    }
  }
`;

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

const GET_ORDERS = gql`
  {
    getOrders {
      id
      client
      order {
        id
        quantity
      }
      seller
    }
  }
`;

const GET_ORDERS_BY_SELLER = gql`
  {
    getOrdersBySeller {
      id
      order {
        id
        quantity
        name
      }
      status
      client {
        id
        name
        lastname
        email
        phone
      }
      total
    }
  }
`;

const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      name
      price
      stock
    }
  }
`;

const GET_PRODUCTS = gql`
  {
    getProducts {
      id
      name
      stock
      price
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
  GET_BEST_SELLERS,
  GET_CLIENT,
  GET_CLIENTS_SELLER,
  GET_ORDERS,
  GET_ORDERS_BY_SELLER,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_USER
}