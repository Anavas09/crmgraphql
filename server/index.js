const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const resolvers = require('./resolvers/resolvers');
const typeDefs = require('./schema/schema');
const connectDB = require('./database/config/db');

require("dotenv").config({
  path: "variables.env",
});

//Connect database
connectDB();

//Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers['authorization'] || '';

    if(token){
      try {
        const user = jwt.verify(token, process.env.SECRET_WORD);

        return {
          user
        }
      } catch (err) {
        console.error('An error has ocurred');
        console.error(err)
      }
    }
  }
});

//Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});