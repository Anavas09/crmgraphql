const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Client = require("../database/models/Client");
const Order = require("../database/models/Order");
const Product = require("../database/models/Product");
const User = require("../database/models/User");

const secretWord = process.env.SECRET_WORD;

const createToken = (user, secretWord, expiresIn) => {
  const { id, email, name, lastname } = user;

  return jwt.sign({ id, email, name, lastname }, secretWord, { expiresIn });
};

/**
 * 
 * Add a new product to the database
 * @param {object} input
 * Object with the product information
 * @returns
 * A new product (MongoDB Document)
 */

const newProduct = async input => {
  //Insert in the database
  try {
    const newProduct = new Product(input);
    //Save
    const product = await newProduct.save();
    //Return the Product to GraphQL
    return product;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Update product information
 * @param {String} id
 * The product ID
 * @param {object} input
 * Object with the product information
 * @returns
 * The product with the new information (MongoDB Document)
 */
const updateProduct = async (id, input) => {
  let product = await Product.findById(id);

  //Check if the product exist
  if (!product) throw new Error("The product not exist");

  //Edit and save data
  product = await Product.findOneAndUpdate({ _id: id }, input, { new: true });

  //Return the product to GraphQL
  return product;
};

/**
 * Delete a product 
 * @param {string} id 
 * The product ID
 * @returns
 * If delete the product: "Product deleted", else, another message.
 */
const deleteProduct = async id => {
  let product = await Product.findById(id);

  //Check if the product exist
  if (!product) throw new Error("The product not exist");

  //Delete product
  product = await Product.findOneAndDelete({ _id: id });

  return "Product deleted";
};

/**
 * Add a new order to the database
 * @param {object} input
 * Object with the order information
 * @param {object} ctx
 * Object wih the user information
 * @returns
 * A new order (MongoDB Document)
 */
const newOrder = async (input, ctx) => {
  const { client } = input;

  let isClient = await Client.findById(client);

  //Check if the client exist
  if (!isClient) throw new Error("Client not found");

  //Check if the seller work with this client
  if (isClient.seller.toString() !== ctx.user.id) {
    throw new Error("You dont work with this client!");
  }

  //Check if we have stock
  for await (const article of input.order) {
    const { id } = article;

    const product = await Product.findById(id);

    //Check if the product exist
    if (!product) throw new Error("The product not exist");

    //Check if we have stock
    if (article.quantity > product.stock) {
      throw new Error(`The ${article.quantity} ${product.name} exceded the stock of ${product.stock}`);
    } else {
      //Substract the quantity to the stock
      product.stock = product.stock - article.quantity;

      await product.save();
    }
  }

  //Create a new order
  const newOrder = new Order(input);

  //Assign a seller
  newOrder.seller = ctx.user.id;

  //Insert in the database
  try {
    //Save
    const order = await newOrder.save();
    //Return the Order to GraphQL
    return order;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Update Order information
 * @param {String} id
 * Order ID
 * @param {object} input
 * Object with the order information
 * @param {object} ctx
 * Object with the user information
 * @returns
 * Order with the new information (MongoDB Document)
 */
const updateOrder = async (id, input, ctx) => {
  const { client } = input;

  //Check if the order exist

  const order = await Order.findById(id);

  if (!order) throw new Error("Order not found");

  //Check if the client exist

  const clientExist = await Client.findById(client);

  if (!clientExist) throw new Error("Client not found");

  //Check if the client and the order belong to the seller
  if (clientExist.seller.toString() !== ctx.user.id) {
    throw new Error("This not belong to you!");
  }

  //Check if we have stock
  if (input.order) {
    for await (const article of input.order) {
      const { id } = article;

      const product = await Product.findById(id);

      //Check if the product exist
      if (!product) throw new Error("The product not exist");

      //Check if we have stock
      if (article.quantity > product.stock) {
        throw new Error(`${article.quantity} ${product.name} exceed the number in stock of ${product.stock}`);
      } else {
        //Substract the quantity to the stock
        product.stock = product.stock - article.quantity;

        await product.save();
      }
    }
  }

  //Edit and save data
  const orderUpdate = await Order.findOneAndUpdate({ _id: id }, input, { new: true, });

  //Return the order to GraphQL
  return orderUpdate;
};

/**
 * Delete Order
 * @param {String} id
 * Order ID
 * @param {object} ctx
 * Object with the user information
 * @returns
 * If delete the order: "Order deleted", else another message.
 */
const deleteOrder = async (id, ctx) => {
  let order = await Order.findById(id);

  //Check if the order exist
  if (!order) throw new Error("Order not found");

  //Check if the user that its trying to delete
  //this data is the same user who created it
  if (order.seller.toString() !== ctx.user.id){
    throw new Error("You dont have credentials for delete this data!")
  };

  //Delete order
  order = await Order.findOneAndDelete({_id: id});
  
  return "Order deleted";
}

/**
 * Add a new client to the database
 * @param {object} input
 * Object with the client information
 * @param {object} ctx
 * Object with the user information
 * @returns
 * A new client (MongoDB Document)
 */
const newClient = async (input, ctx) => {
  const { email } = input;
  //Check if the Client is already created
  const isRegister = await Client.findOne({ email });

  if (isRegister) throw new Error("Client registrated");

  const newClient = new Client(input);

  //Assing a seller
  newClient.seller = ctx.user.id;

  //Insert in the database
  try {
    //Save
    const client = await newClient.save();
    //Return the Client to GraphQL
    return client;
  } catch (err) {
    console.error(err);
  }
};

/**
 * Update client information
 * 
 * @param {String} id 
 * @param {object} input 
 * @param {object} ctx
 * @returns
 * New client information (MongoDB Document)
 * 
 */
const updateClient = async (id, input, ctx) => {
  let client = await Client.findById(id);

  //Check if the client exist
  if (!client) throw new Error("Client not found");

  //Check if the user that its trying to edit
  //this data is the same user who created it
  if (client.seller.toString() !== ctx.user.id) {
    throw new Error("You dont have credentials for edit this data!");
  }

  //Edit and save data
  client = await Client.findOneAndUpdate({ _id: id }, input, { new: true });

  //Return the Client to GraphQL
  return client;
};

/**
 * Delete a client from the database
 * 
 * @param {String} id
 * @param {object} ctx
 * @returns
 * If delete the client: "Client deleted", else another message.
 */
const deleteClient = async (id, ctx) => {
  let client = await Client.findById(id);

  //Check if the client exist
  if (!client) throw new Error("Client not found");

  //Check if the user that its trying to delete
  //this data is the same user who created it
  if (client.seller.toString() !== ctx.user.id) {
    throw new Error("You dont have credentials for delete this data!");
  }

  //Delete client
  client = await Client.findOneAndDelete({ _id: id });

  return "Client deleted";
};

/**
 * Add a new user to the database
 * @param {object} input
 * Object with the new user information
 * @returns
 * New user information (MongoDB Document)
 */
const newUser = async input => {
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
};

/**
 * Authenticate user
 * @param {object} input
 * Object with the user information
 * @returns
 * If the email and password are good return a token.
 * else return an error message
 * @token JSON Web Token with the user information
 */
const authUser = async input => {
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
}

module.exports = {
  newClient,
  updateClient,
  deleteClient,
  newOrder,
  updateOrder,
  deleteOrder,
  newProduct,
  updateProduct,
  deleteProduct,
  newUser,
  authUser
};