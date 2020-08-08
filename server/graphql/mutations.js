const Product = require("../database/models/Product");
const Client = require("../database/models/Client");
const Order = require("../database/models/Order");

/**
 * 
 * @param {object} input
 * Add a new product to the database
 * @returns
 * A MongoDB document (The product)
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
      throw new Error(`The ${article.quantity} ${product.name} exeded the stock of ${product.stock})`);
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
        throw new Error(`The ${article.quantity} ${product.name} exeded the stock of ${product.stock})`);
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

const deleteOrder = async (id, ctx) => {
  let order = await Order.findById(id);

  //Check if the order exist
  if (!order) throw new Error("Order not found");

  //Check if the user that its trying to delete
  //this data is the same who created
  if (order.seller.toString() !== ctx.user.id){
    throw new Error("You dont have credentials for delete this data!")
  };

  //Delete order
  order = await Order.findOneAndDelete({_id: id});
  
  return "Order deleted";
}

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

module.exports = {
  newClient,
  newOrder,
  updateOrder,
  deleteOrder,
  newProduct,
};