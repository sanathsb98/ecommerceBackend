const express = require('express')
const getAllUsers = require('../controller/user-controller').getAllUsers;
const registerNewUser = require('../controller/user-controller').registerNewUser;

const router = express.Router()

router.get("/api/users",getAllUsers)
router.post("/api/signup",registerNewUser)


module.exports = router;