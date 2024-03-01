const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

// Waiting for database name
// mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});