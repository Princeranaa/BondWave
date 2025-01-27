const ConnectionRequest = require("../model/Connection_model");

exports.UserConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const USER_INFO = ["firstName","lastName","age","gender","photoUrl","about","skills"]

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      
    }).populate("fromUserId", USER_INFO)

    res.status(200).json({
      message: "Data Fetch Successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
