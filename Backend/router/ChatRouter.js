const express = require("express");
const { getChatcontroller } = require("../controller/ChatController");
const { userAuth } = require("../middleware/auth");
const chatRouter = express.Router()



chatRouter.post("/chat/:targetUserId", userAuth, getChatcontroller)

module.exports = chatRouter