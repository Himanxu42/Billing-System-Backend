const express = require('express');
const { createOrder,getOrderById } = require('../controller/OrderCtrl');
const Router = express.Router();

Router.post('/create/:id', createOrder);
Router.get('/order/:userid/:orderid', getOrderById);


module.exports = Router;