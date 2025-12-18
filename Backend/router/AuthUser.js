const express = require('express');
const router = express.Router();


const { SignupTheUser, loginTheUser, logout,forgotPassword, resetPassword} = require('../controller/AuthController');

router.post("/signup", SignupTheUser)
router.post("/login", loginTheUser)
router.post("/logout", logout)

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


module.exports = router