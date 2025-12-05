const express = require("express");
const paymentRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const { createPayment, verifyPayment } = require("../controller/PaymentController");


paymentRouter.post("/payment/create", userAuth, createPayment);
paymentRouter.post("/payment/webhook",  verifyPayment)



module.exports = paymentRouter;