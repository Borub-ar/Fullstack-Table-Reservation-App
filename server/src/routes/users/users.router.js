const express = require('express');

const { httpCreateNewUser } = require('./users.controller');

const userRouter = express.Router();

userRouter.post('/', httpCreateNewUser);

module.exports = userRouter;
