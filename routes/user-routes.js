const express = require('express');
const verifyToken = require('../middleware');
const getAllUsers = require('../controller/user-controller').getAllUsers;
const registerNewUser = require('../controller/user-controller').registerNewUser;
const signin = require('../controller/user-controller').signin;

const router = express.Router()

router.get("/api/users", getAllUsers)
router.post("/api/signup", registerNewUser)
router.post("/api/signin", signin)
router.get("/api/data", verifyToken, (req, res) => {
    res.json({ message: `Welcome ${req.body.email}! this is protected data` })
})

module.exports = router;