const jwt = require("jsonwebtoken");

const Client = require("../database/models/Client");
const Product = require("../database/models/Product");
const User = require("../database/models/User");
const Order = require("../database/models/Order");

require("dotenv").config({
  path: "variables.env",
});

const secretWord = process.env.SECRET_WORD;

const getClient = async (id, ctx) => {
  try {
    const client = await Client.findById(id);

    //Check if the client exist
    if (!client) throw new Error("Client not found");

    //Check if the user who its trying to see
    //this data is the same who created
    if (client.seller.toString() !== ctx.user.id) {
      throw new Error("You dont have credentials to see this data!");
    }

    return client;
  } catch (err) {
    console.error(err);
  }
};

const getClients = async () => {
  try {
    const allClients = await Client.find({});

    return allClients;
  } catch (err) {
    console.error(err);
  }
};

const getOrder = async (id, ctx) => {
  const order = await Order.findById(id);

  //Check if the order exist
  if (!order) throw new Error("Order not find");

  //Check if the user who its trying to see
  //this data is the same who created
  if (order.seller.toString() !== ctx.user.id) {
    throw new Error("You dont have credentials to see this data!");
  }

  return order;
};

const getOrders = async () => {
  try {
    const orders = await Order.find({});

    return orders;
  } catch (err) {
    console.error(err);
  }
};

const getOrdersBySeller = async ctx => {
  try {
    const orders = await Order.find({ seller: ctx.user.id });

    return orders;
  } catch (err) {
    console.error(err);
  }
};

const getOrdersByState = async (state, ctx) => {
  try {
    const orders = await Order.find({ seller: ctx.user.id, state });

    return orders;
  } catch (err) {
    console.error(err);
  }
};

const getProduct = async id => {
  const product = await Product.findById(id);

  //Check if the product exist
  if (!product) throw new Error("The product not exist");

  return product;
};

const getProducts = async () => {
  try {
    const allProducts = await Product.find({});

    return allProducts;
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param {token} token
 * A valid json web token
 * @returns
 * User id
 */
const getUser = async token => {
  const userId = await jwt.verify(token, secretWord);
  //const userData = User.findById(userId);
  return userId;
};

const getUsers = async () => {
  try {
    const allUsers = await User.find({});

    return allUsers;
  } catch (err) {
    console.error(err);
  }
};

const getBestClients = async () => {
  const bestClients = await Order.aggregate([
    { $match: { state: "COMPLETE" } },
    {
      $group: {
        _id: "$client",
        total: { $sum: "$total" },
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "_id",
        foreignField: "_id",
        as: "client",
      },
    },
    {
      $limit: 10,
    },
    {
      $sort: { total: -1 },
    },
  ]);

  return bestClients;
};

const getBestSellers = async () => {
  const bestSellers = Order.aggregate([
    { $match: { state: "COMPLETE" } },
    {
      $group: {
        _id: "$seller",
        total: { $sum: "$total" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "seller",
      },
    },
    { $limit: 3 },
    { $sort: { total: -1 } },
  ]);

  return bestSellers;
};

const searchProduct = async text => {
  const products = await Product.find({ $text: { $search: text } }).limit(10);

  return products;
};

module.exports = {
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
};