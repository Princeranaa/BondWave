const express = require('express');
const router = express.Router();


const { UserController } = require('../controller/User-controller');

router.post("/user", UserController)



module.exports = router