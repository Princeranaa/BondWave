const express = require('express');
const router = express.Router();


const { SignupTheUser, loginTheUser, logout } = require('../controller/AuthController');

router.post("/signup", SignupTheUser)
router.post("/login", loginTheUser)
router.post("/logout", logout)


module.exports = router