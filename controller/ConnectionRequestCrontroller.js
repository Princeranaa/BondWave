const ConnectionRequest = require("../model/Connection_model");
const User = require("../model/User_model");

exports.conncetionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;  // Assuming req.user is already populated
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
