
const express = require('express');
const bodyParser = require ('body-parser');
const Mongodb = require('./db/Mongodb.js');
const { GraphQLSchema } = require('graphql');
const { root } = require('./models/root');
const { schema } = require('./models/graphql');

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/',require('./Router/router'));





app.listen(port,()=>{
    console.log(`API REST corriendo en Http://localhost:${port}`);
    })