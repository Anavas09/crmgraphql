const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Client = require("../database/models/Client");
const Product = require("../database/models/Product");
const User = require("../database/models/User");
const Order = require("../database/models/Order");

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
} = require("../graphql/queries");
const {
  newClient,
  newProduct,
  newOrder,
  updateOrder,
  deleteOrder,
} = require("../graphql/mutations");

require("dotenv").config({
  path: "variables.env",
});

const secretWord = process.env.SECRET_WORD;

const createToken = (user, secretWord, expiresIn) => {
  const { id, email, name, lastName } = user;

  return jwt.sign({ id, email, name, lastName }, secretWord, { expiresIn });
};

const resolvers = {
  Query: {
    getUser: (_, { token }) => getUser(token),
    getUsers: () => getUsers(),
    getClient: (_, { id }, ctx) => getClient(id, ctx),
    getClients: () => getClients(),
    getClientsSeller: async (_, {}, ctx) => {
      try {
        const allClientsSeller = await Client.find({
          seller: ctx.user.id.toString(),
        });

        return allClientsSeller;
      } catch (err) {
        console.error(err);
      }
    },
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
    updateClient: async (_, { id, input }, ctx) => {
      let client = await Client.findById(id);

      //Check if the client exist
      if (!client) throw new Error("Client not found");

      //Check if the user that its trying to edit
      //this data is the same who created
      if (client.seller.toString() !== ctx.user.id) {
        throw new Error("You dont have credentials for edit this data!");
      }

      //Edit and save data
      client = await Client.findOneAndUpdate({ _id: id }, input, { new: true });

      //Return the Client to GraphQL
      return client;
    },
    deleteClient: async (_, { id }, ctx) => {
      let client = await Client.findById(id);

      //Check if the client exist
      if (!client) throw new Error("Client not found");

      //Check if the user that its trying to delete
      //this data is the same who created
      if (client.seller.toString() !== ctx.user.id) {
        throw new Error("You dont have credentials for delete this data!");
      }

      //Delete client
      client = await Client.findOneAndDelete({ _id: id });

      return "Client deleted";
    },
    newOrder: (_, { input }, ctx) => newOrder(input, ctx),
    updateOrder: (_, { id, input }, ctx) => updateOrder(id, input, ctx),
    deleteOrder: (_, { id }, ctx) => deleteOrder(id, ctx),
    newProduct: (_, { input }) => newProduct(input),
    updateProduct: async (_, { id, input }) => {
      let product = await Product.findById(id);

      //Check if the product exist
      if (!product) throw new Error("The product not exist");

      //Edit and save data
      product = await Product.findOneAndUpdate({ _id: id }, input, { new: true });

      //Return the product to GraphQL
      return product;
    },
    deleteProduct: async (_, { id }) => {
      let product = await Product.findById(id);

      //Check if the product exist
      if (!product) throw new Error("The product not exist");

      //Delete product
      product = await Product.findOneAndDelete({ _id: id });

      return "Product deleted";
    },
    newUser: async (_, { input }) => {
      const { email, password } = input;
      //Check if the user is already created
      const isRegister = await User.findOne({ email });

      if (isRegister) throw new Error("User registrated");
      //Hash the password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      //Insert in the database
      try {
        const newUser = new User(input);
        //Save
        const user = await newUser.save();
        //Return the user to GraphQL
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    authUser: async (_, { input }) => {
      const { email, password } = input;
      //Check if the user is already created
      const isRegister = await User.findOne({ email });

      if (!isRegister) throw new Error("User are not registrated");

      //Check the password
      const passwordOK = await bcryptjs.compare(password, isRegister.password);

      if (!passwordOK) throw new Error("Wrong Password");
      //Create token (json web token)
      return {
        token: createToken(isRegister, secretWord, "24h"),
      };
    },
  },
};

module.exports = resolvers;