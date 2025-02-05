const express = require('express')
const userRouter = express.Router()

const {userAuth} = require("../middleware/auth");
const { UserConnectionRequest, requestAllTheUser, userFeed } = require('../controller/UserController');

userRouter.get("/user/requests/received", userAuth, UserConnectionRequest)
userRouter.get("/user/connection", userAuth, requestAllTheUser)
userRouter.get("/feed", userAuth, userFeed)



module.exports = userRouter