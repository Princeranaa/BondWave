const ConnectionRequest = require("../model/Connection_model");
const User = require("../model/Auth_user");

// const USER_INFO = ["firstName","lastName","age","gender","photoUrl","about","skills",];
const USER_INFO = "firstName lastName avatarUrl age gender about skills";
exports.UserConnectionRequest = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_INFO);

    res.status(200).json({
      message: "Data Fetch Successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.requestAllTheUser = async (req, res) => {
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
};

exports.userFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1)*limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId  toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    const hideUserFromFeed = new Set();
    connectionRequests.forEach((request) => {
      // hideUserFromFeed.add(request.fromUserId.toString());
      // hideUserFromFeed.add(request.toUserId.toString());
        hideUserFromFeed.add(request.fromUserId._id.toString());
        hideUserFromFeed.add(request.toUserId._id.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_INFO).skip(skip).limit(limit);

    res.json({ data: users });
  
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
