const ConnectionRequest = require("../model/Connection_model");

const USER_INFO = ["firstName","lastName","age","gender","photoUrl","about","skills"]
exports.UserConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;


    const connectionRequest = await ConnectionRequest.find({toUserId: loggedInUser._id,status: "interested"}).populate("fromUserId", USER_INFO)

    res.status(200).json({
      message: "Data Fetch Successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.requestAllTheUser = async (req,res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_INFO)
      .populate("toUserId", USER_INFO);

    console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}
