const express = require('express');
const { createCategory, getCategories } = require('../controller/CategoryCtrl');
const Router = express.Router();
Router.post('/addcategory', createCategory);
Router.get('/categories/:id',getCategories)

module.exports = Router;