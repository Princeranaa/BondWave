const express = require("express");
const profilerouter = express.Router();

const { userAuth } = require("../middleware/auth");

const { Profileview, ProfileEdit } = require("../controller/ProfileViewController");

profilerouter.get("/profile/view", userAuth, Profileview);
profilerouter.patch("/profile/edit", userAuth, ProfileEdit);


module.exports = profilerouter;
