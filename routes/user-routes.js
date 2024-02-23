const express = require('express')
const getAllUsers = require('../controller/user-controller').getAllUsers;
const registerNewUser = require('../controller/user-controller').registerNewUser;
const signin = require('../controller/user-controller').signin;

const router = express.Router()

router.get("/api/users",getAllUsers)
router.post("/api/signup",registerNewUser)
router.get("/api/signin",signin)

module.exports = router;