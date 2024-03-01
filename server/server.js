import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

// import typeDefs from './schemas/';
import resolvers from './schemas/resolvers.js';

// Importing Mongoose models
import Item from './models/Item.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Order from './models/Order.js';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Provide the Mongoose models to the resolvers
const models = {
    Item,
    User,
    Category,
    Order,
};

const server = new ApolloServer({
    // typeDefs,
    resolvers,
    context: () => ({ models }) // Provide the models to the resolvers
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});