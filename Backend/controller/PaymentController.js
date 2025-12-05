const razorpayInstance = require("../config/razorpay");
const Payment = require("../model/payment_model");
const User = require("../model/Auth_user");
const { membershipAmount } = require("../utils/memberShipConstans");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

/* 
exports.createPayment = async (req, res) => {
  try {
    //   fetch the data
    const { membershipType } = req.body;

    //   fetch the user details
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    //   saved in the database
    console.log("orderCreated=======>", order); // to check what are the response.

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    //   return back order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.log("something went wrong->", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

 */

exports.createPayment = async (req, res) => {
  try {
    // fetch the data
    const { membershipType } = req.body;

    // fetch the user details
    const { firstName, lastName, emailId } = req.user;

    // ---------------------------
    // FAKE / MOCK ORDER (no Razorpay call)
    // ---------------------------

    const mockOrder = {
      id: "order_mock_" + Date.now(), // fake order id
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt_mock_" + Math.floor(Math.random() * 100000),
      status: "created",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType,
      },
    };

    // log it
    console.log("Mock orderCreated =======>", mockOrder);

    // save mock order into DB normally
    const payment = new Payment({
      userId: req.user._id,
      orderId: mockOrder.id,
      status: mockOrder.status,
      amount: mockOrder.amount,
      currency: mockOrder.currency,
      receipt: mockOrder.receipt,
      notes: mockOrder.notes,
    });

    const savedPayment = await payment.save();

    // return mock order to frontend
    res.json({
      ...savedPayment.toJSON(),
      keyId: process.env.RAZORPAY_KEY_ID || "mock_key_123",
    });
  } catch (error) {
    console.log("something went wrong->", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    console.log("Webhook Called");
    const webhookSignature = req.get("X-Razorpay-Signature");
    console.log("Webhook Signature", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      console.log("INvalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    console.log("Valid Webhook Signature");

    // Udpate my payment Status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();
    console.log("Payment saved");

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    console.log("User saved");

    await user.save();

    // Update the user as premium

    // if (req.body.event == "payment.captured") {
    // }
    // if (req.body.event == "payment.failed") {
    // }

    // return success response to razorpay

    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.premiumVerifyUser = async (req, res) => {
  const user = req.user.toJSON();
  console.log(user);
  if (user.isPremium) {
    return res.json({ ...user });
  }
  return res.json({ ...user });
};
