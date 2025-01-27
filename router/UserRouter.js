const express = require('express')
const userRouter = express.Router()

const {userAuth} = require("../middleware/auth");
const { UserConnectionRequest } = require('../controller/UserController');


userRouter.get("/user/requests/received", userAuth, UserConnectionRequest)





module.exports = userRouter