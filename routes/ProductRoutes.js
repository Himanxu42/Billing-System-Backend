const express = require('express');
const { createProduct, getProducts, searchProducts, addDiscount, updateProduct, deleteProduct } = require('../controller/ProductCtrl');
const Router = express.Router();
Router.post('/addproduct', createProduct);
Router.get('/products/:id',getProducts)
Router.get('/products/:search/:id', searchProducts);
Router.post('/discount/:id', addDiscount);
Router.post('/update/:id', updateProduct)
Router.delete('/delete/:id', deleteProduct);
module.exports = Router;