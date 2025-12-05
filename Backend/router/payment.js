const express = require("express");
const paymentRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const { createPayment, verifyPayment, premiumVerifyUser } = require("../controller/PaymentController");


paymentRouter.post("/payment/create", userAuth, createPayment);
paymentRouter.post("/payment/webhook",  verifyPayment);
paymentRouter.get("/premium/verify", userAuth, premiumVerifyUser)



module.exports = paymentRouter;