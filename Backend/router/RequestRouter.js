const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");

const { conncetionRequest, accepteTheRequest } = require("../controller/ConnectionRequestCrontroller");

requestRouter.post("/request/send/:status/:toUserId", userAuth, conncetionRequest )
requestRouter.post("/request/review/:status/:requestId", userAuth, accepteTheRequest )



module.exports = requestRouter;

