const ConnectionRequest = require("../model/Connection_model");
const User = require("../model/Auth_user");

exports.conncetionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id; // Assuming req.user is already populated
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // Validate the status type ===>
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type",
      });
    }

    // Fetch both users' details (including firstName)
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    // Check if both users exist
    if (!fromUser || !toUser) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    // Check if the connection already exists in the database
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection request already exists",
      });
    }

    // Create a new connection request object
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    // Save the connection request into the database
    const data = await connectionRequest.save();

    // Modify the message based on the status
    let statusMessage = "";
    if (status === "interested") {
      statusMessage = `${fromUser.firstName} is interested in ${toUser.firstName}`;
    } else if (status === "ignored") {
      statusMessage = `${fromUser.firstName} has ignored ${toUser.firstName}`;
    }

    // Return the response
    return res.status(200).json({
      message: statusMessage,
      data,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.accepteTheRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { status, requestId } = req.params;

    // validate the status ==> "accepted" or the "rejected"
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type" });
    }

    // find the Use is LoggedIn User or not and also its present in the Data base or not
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    if (!connectionRequest) {
      return res
        .status(404)
        .json({ message: "No such connection request found" });
    }

    // update the status of connection request
    connectionRequest.status = status;

    const data = await connectionRequest.save();
    res.status(200).json({ message: "Connection request " + status, data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
