const express = require('express');
const { signup, login } = require('../controller/AuthCtrl');
const Router = express.Router();

Router.post('/signup', signup);
Router.post('/login', login);

module.exports = Router;