const {
  getClient,
  getClients,
  getOrder,
  getOrders,
  getOrdersBySeller,
  getOrdersByState,
  getProduct,
  getProducts,
  getUser,
  getUsers,
  getBestClients,
  getBestSellers,
  searchProduct,
  getClientsSeller,
} = require("../graphql/queries");
const {
  newClient,
  newProduct,
  newOrder,
  updateOrder,
  deleteOrder,
  updateClient,
  deleteClient,
  updateProduct,
  deleteProduct,
  newUser,
  authUser,
} = require("../graphql/mutations");

require("dotenv").config({
  path: "variables.env",
});

const resolvers = {
  Query: {
    getUser: (_, { token }) => getUser(token),
    getUsers: () => getUsers(),
    getClient: (_, { id }, ctx) => getClient(id, ctx),
    getClients: () => getClients(),
    getClientsSeller: async (_, {}, ctx) => getClientsSeller(ctx),
    getOrder: (_, { id }, ctx) => getOrder(id, ctx),
    getOrders: () => getOrders(),
    getOrdersBySeller: (_, {}, ctx) => getOrdersBySeller(ctx),
    getOrdersByState: (_, { state }, ctx) => getOrdersByState(state, ctx),
    getProducts: () => getProducts(),
    getProduct: (_, { id }) => getProduct(id),
    getBestClients: () => getBestClients(),
    getBestSellers: () => getBestSellers(),
    searchProduct: (_, { text }) => searchProduct(text),
  },
  Mutation: {
    newClient: (_, { input }, ctx) => newClient(input, ctx),
    updateClient: (_, { id, input }, ctx) => updateClient(id, input, ctx),
    deleteClient: async (_, { id }, ctx) => deleteClient(id, ctx),
    newOrder: (_, { input }, ctx) => newOrder(input, ctx),
    updateOrder: (_, { id, input }, ctx) => updateOrder(id, input, ctx),
    deleteOrder: (_, { id }, ctx) => deleteOrder(id, ctx),
    newProduct: (_, { input }) => newProduct(input),
    updateProduct: (_, { id, input }) => updateProduct(id, input),
    deleteProduct: (_, { id }) => deleteProduct(id),
    newUser: async (_, { input }) => newUser(input),
    authUser: async (_, { input }) => authUser(input),
  },
};

module.exports = resolvers;