const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const PORT = 4000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => console.log('Now browse to localhost:4000/graphql'));