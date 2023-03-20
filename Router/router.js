const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const router = express.Router();
const Product = require('../models/product');
const { schema, root } = require('../models/graphql');

router.get('/api/producto', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    }
    if (!products) {
      return res.status(404).send({ message: 'No existen productos' });
    }
    res.status(200).send({ products });
  });
});

router.get('/api/producto/:productoId', (req, res) => {
  let productoId = req.params.productoId;
  Product.findById(productoId, (err, product) => {
    if (err) {
      return res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    }
    if (!product) {
      return res.status(404).send({ message: `El producto no existe` });
    }
    res.status(200).send({ product });
  });
});
router.post('/api/producto', (req, res) => {
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: false,
      context: { req, res },
    })(req, res);
  });

router.post('/api/productos',(req, res) => {
  console.log('POST /api/productos');
  let producto = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  });
  producto.save((err,productSave) => {
    if (err) {
      return res.status(500).send({ message:`Error al guardar en la base de datos: ${err}` });
    }   
    return res.status(200).send({ product: productSave });
  }); 
});

router.put('/api/producto/:productoId', (req, res) => {
  let productoId = req.params.productoId;
  let update = req.body;
  Product.findByIdAndUpdate(productoId, update, {new: true}, (err, productUpdated) => {
    if (err) {
      res.status(500).send({ message: `Error al actualizar el producto: ${err}` });
    } else {
      res.status(200).send({ product: productUpdated });
    }
  });
});

router.delete('/api/producto/:productoId', (req, res) => {
  let productoId = req.params.productoId;
  Product.findByIdAndRemove(productoId, (err, product) => {
    if (err) {
      res.status(500).send({ message: `Error al borrar el producto: ${err}` });
    } else {
      res.status(200).send({ message: 'El producto ha sido eliminado correctamente' });
    }
  });
});

router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

module.exports = router;

