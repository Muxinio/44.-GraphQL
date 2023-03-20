const { buildSchema } = require('graphql');
const root = require('./root');

const products = [
  {id: 1, name: 'tomate', price: 10, category: 'Verdura'},
  {id: 2, name: 'Empanada', price: 120, category: 'Comida Rapida'},
  {id: 3, name: 'SevenUp', price: 300, category: 'Bebida'}
]

const schema = buildSchema(`
  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
  }

  type Query {
    products: [Product]
    productById(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, category: String!): Product
    updateProduct(id: ID!, name: String!, price: Float!, category: String!): Product
    deleteProduct(id: ID!): Product
  }
`);

module.exports = { schema, root };
