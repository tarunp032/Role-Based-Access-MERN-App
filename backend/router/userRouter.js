const express = require("express");
const Router = express.Router();

const userController = require("../controller/userController");

Router.post('/create', userController.createUser)
Router.get('/getUser', userController.userGet)
Router.post('/login', userController.login)

module.exports = Router;
