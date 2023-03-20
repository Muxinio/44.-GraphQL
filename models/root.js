const Mongodb = require('../db/Mongodb');
const products = [
  {id: 1, name: 'tomate', price: 10, category: 'Verdura'},
  {id: 2, name: 'Empanada', price: 120, category: 'Comida Rapida'},
  {id: 3, name: 'SevenUp', price: 300, category: 'Bebida'}
]

const root = {
  products: () => {
    return products;
  },
  productById: ({ id }) => {
    return products.find(product => product.id == id);
  },
  addProduct: ({ name, price, category }) => {
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      category
    };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: ({ id, name, price, category }) => {
    const productIndex = products.findIndex(product => product.id == id);
    if (productIndex === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    const updatedProduct = {
      ...products[productIndex],
      name,
      price,
      category
    };
    products[productIndex] = updatedProduct;
    return updatedProduct;
  },
  deleteProduct: ({ id }) => {
    const productIndex = products.findIndex(product => product.id == id);
    if (productIndex === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    const deletedProduct = products.splice(productIndex, 1)[0];
    return deletedProduct;
  }
};

module.exports = root;
