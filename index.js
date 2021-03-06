const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const {GraphQLServer} = require('graphql-yoga');

const app = express();

const typeDefs = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');


mongoose.connect("mongodb+srv://" + 
        process.env.MONGO_USER + ":"+
        process.env.MONGO_PWD +
        "@node-rest-shop.etpxr.mongodb.net/" +
        process.env.MONGO_DB +
        "?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log("\x1b[35m"," Database is connected..."))
.catch(
    (err) => console.error(err)
);


app.use(bodyParser.json());

app.use(isAuth);

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('localhost:4000');
});