const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../middleware/auth");
const { conncetionRequest } = require("../controller/ConnectionRequestCrontroller");

requestRouter.post("/request/send/:status/:toUserId", userAuth, conncetionRequest )

module.exports = requestRouter;

