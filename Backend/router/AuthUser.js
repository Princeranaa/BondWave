const express = require('express');
const router = express.Router();


const { SignupTheUser, loginTheUser, logout,forgotPassword, resetPassword,changePassword} = require('../controller/AuthController');
const { userAuth } = require('../middleware/auth');

router.post("/signup", SignupTheUser)
router.post("/login", loginTheUser)
router.post("/logout", logout)

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.put('/change-password', userAuth, changePassword);


module.exports = router