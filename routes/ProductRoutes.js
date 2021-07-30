const express = require('express');
const { createProduct, getProducts, searchProducts, addDiscount } = require('../controller/ProductCtrl');
const Router = express.Router();
Router.post('/addproduct', createProduct);
Router.get('/products',getProducts)
Router.get('/products/:search', searchProducts);
Router.post('/discount/:id', addDiscount);
module.exports = Router;