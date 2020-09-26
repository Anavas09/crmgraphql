const jwt = require("jsonwebtoken");

const Client = require("../database/models/Client");
const Product = require("../database/models/Product");
const User = require("../database/models/User");
const Order = require("../database/models/Order");

require("dotenv").config({
  path: "variables.env",
});

/**
 * Get Client Information
 * @param {String} id
 * Client ID
 * @param {object} ctx
 * Object with the user information
 * @returns
 * Client Data
 */
const getClient = async (id, ctx) => {
  try {
    const client = await Client.findById(id);

    //Check if the client exist
    if (!client) throw new Error("Client not found");

    //Check if the user who its trying to see
    //this data is the same user who created it
    if (client.seller.toString() !== ctx.user.id) {
      throw new Error("You dont have credentials to see this data!");
    }

    return client;
  } catch (err) {
    console.error(err);
  }
};

/**
 * List of clients data
 * @returns Client Array
 */
const getClients = async () => {
  try {
    const allClients = await Client.find({});

    return allClients;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Clients of a specific seller
 * @param {object} ctx
 * Object with the user information
 * @returns
 * Clients Array
 */
const getClientsSeller = async ctx => {
  try {
    const allClientsSeller = await Client.find({
      seller: ctx.user.id.toString(),
    });

    return allClientsSeller;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get Order data
 * @param {String} id
 * Order ID
 * @param {object} ctx
 * Object with the user information
 * @returns
 * Order data (MongoDB Document)
 */
const getOrder = async (id, ctx) => {
  const order = await Order.findById(id);

  //Check if the order exist
  if (!order) throw new Error("Order not find");

  //Check if the user who its trying to see
  //this data is the same user who created it
  if (order.seller.toString() !== ctx.user.id) {
    throw new Error("You dont have credentials to see this data!");
  }

  return order;
};

/**
 * Orders list
 * @returns
 * Orders Array (MongoDB Document)
 */
const getOrders = async () => {
  try {
    const orders = await Order.find({});

    return orders;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Orders list by seller
 * @param {*} ctx
 * Object with the user information
 * @returns
 * Orders list by specific seller (MongoDB Document)
 */
const getOrdersBySeller = async ctx => {
  try {
    const orders = await Order.find({ seller: ctx.user.id }).populate('client');

    return orders;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Orders list by status
 * @param {String} status
 * String with a unique valor (PENDING, COMPLETE, CANCEL)
 * @param {object} ctx
 * Object with the user information
 * @returns
 * Orders list by status
 */
const getOrdersByStatus = async (status, ctx) => {
  try {
    const orders = await Order.find({ seller: ctx.user.id, status });

    return orders;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get a Product Data
 * @param {String} id
 * Product ID
 * @returns
 * Product Data by ID (MongoDB Document) 
 */
const getProduct = async id => {
  const product = await Product.findById(id);

  //Check if the product exist
  if (!product) throw new Error("The product not exist");

  return product;
};

/**
 * Product List
 * @returns
 * Product Array (MongoDB Document)
 */
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
 * @param {ctx} ctx
 * The GraphQL context
 * @returns
 * User data
 */
const getUser = async ctx => {
  return ctx.user;
};

/**
 * Users List
 * @returns
 * User Array (MongoDB Document)
 */
const getUsers = async () => {
  try {
    const allUsers = await User.find({});

    return allUsers;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get a list of Best Clients
 * @returns
 * An ordered Client list (MongoDB Document)
 */
const getBestClients = async () => {
  const bestClients = await Order.aggregate([
    { $match: { status: "COMPLETE" } },
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

/**
 * Get a list of Best Sellers
 * @returns
 * An ordered Sellers list (MongoDB Document)
 */
const getBestSellers = async () => {
  const bestSellers = Order.aggregate([
    { $match: { status: "COMPLETE" } },
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

/**
 * Search a product
 * @param {String} text
 * @returns
 * Product List (MongoDB Document)
 */
const searchProduct = async text => {
  const products = await Product.find({ $text: { $search: text } }).limit(10);

  return products;
};

module.exports = {
  getClient,
  getClients,
  getClientsSeller,
  getOrder,
  getOrders,
  getOrdersBySeller,
  getOrdersByStatus,
  getProduct,
  getProducts,
  getUser,
  getUsers,
  getBestClients,
  getBestSellers,
  searchProduct,
};