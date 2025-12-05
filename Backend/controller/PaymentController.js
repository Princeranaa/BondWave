const razorpayInstance = require("../config/razorpay");
const Payment = require("../model/payment_model");
const {membershipAmount} = require("../utils/memberShipConstans")

exports.createPayment = async (req, res) => {
  try {
    /* fetch the data  */  
    const {membershipType} = req.body

    /* fetch the user details  */
    const {firstName,lastName,emailId} = req.user

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

    /* saved in the database  */
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

    /* return back order details to frontend */
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });

  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
