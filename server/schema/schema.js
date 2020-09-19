const { gql } = require('apollo-server');

const typeDefs = gql`
  """
  Client type.
  """
  type Client {
    id: ID
    name: String
    lastname: String
    email: String
    company: String
    phone: String
    seller: ID
  }

  """
  Order type.
  """
  type Order {
    id: ID
    order: [OrderGroup]
    total: Int
    client: Client
    seller: ID
    status: OrderStatus
    date: String
  }

  type OrderGroup {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  """
  Product type.
  """
  type Product {
    id: ID
    name: String
    stock: Int
    price: Float
    createAt: String
  }

  """
  User type.
  """
  type User {
    id: ID
    name: String
    lastname: String
    email: String
    age: Int
    createAt: String
  }

  """
  Token type.
  """
  type Token {
    token: String
  }

  type TopClient {
    total: Float
    client: [Client]
  }

  type TopSeller {
    total: Float
    seller: [User]
  }

  #CLIENT INPUTS

  input ClientInput {
    name: String!
    lastname: String!
    email: String!
    company: String!
    phone: String
  }

  #ORDER INPUTS

  input ProductOrderInput {
    id: ID!
    quantity: Int!
    name: String!
    price: Float
  }

  input OrderInput {
    order: [ProductOrderInput]
    total: Float!
    client: ID!
    status: OrderStatus
  }

  enum OrderStatus {
    PENDING
    COMPLETE
    CANCELED
  }

  #PRODUCT INPUTS

  input ProductInput {
    name: String!
    stock: Int!
    price: Float!
  }

  #USER INPUTS

  input UserInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
    age: Int!
  }

  input AuthUserInput {
    email: String!
    password: String!
  }

  type Query {
    #Clients
    """
    Return all clients in the database.
    """
    getClients: [Client]

    """
    Return Client data by id.
    """
    getClient(id: ID!): Client

    """
    Return all clients in the database.
    """
    getClientsSeller: [Client]

    #Orders

    """
    Return Order data by id.
    """
    getOrder(id: ID!): Order

    """
    Return all the orders in the database.
    """
    getOrders: [Order]

    """
    Return Orders data by seller id.
    """
    getOrdersBySeller: [Order]

    """
    Return Orders data by status.
    """
    getOrdersByStatus(status: String!): [Order]

    #Products
    """
    Return all products in the database.
    """
    getProducts: [Product]

    """
    Return Product data by id.
    """
    getProduct(id: ID!): Product

    #User
    """
    Return User data by token.
    """
    getUser: User
    """
    Return all users in the database.
    """
    getUsers: [User]

    #Advanced Search

    """
    Return the best clients.
    """
    getBestClients: [TopClient]

    """
    Return the best sellers.
    """
    getBestSellers: [TopSeller]

    """
    Return all products that match with the text.
    """
    searchProduct(text: String!): [Product]
  }

  type Mutation {
    #Client Mutations
    newClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): String

    #Order Mutations
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    deleteOrder(id: ID!): String

    #Product Mutations
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    #User Mutations
    newUser(input: UserInput): User
    authUser(input: AuthUserInput): Token
  }
`;

module.exports = typeDefs;