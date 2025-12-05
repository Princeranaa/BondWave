const express = require("express");
const paymentRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const { createPayment } = require("../controller/PaymentController");


paymentRouter.post("/payment/create", userAuth, createPayment)



module.exports = paymentRouter;