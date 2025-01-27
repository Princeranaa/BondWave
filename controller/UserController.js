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
        const connectionRequest = await ConnectionRequest.find({
             $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
              ]
        }).populate("fromUserId", USER_INFO)
        const data = connectionRequest.map(row=>row.fromUserId)


        res.status(200).json({
            message: "Connetion fetch successfully",
            data
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
