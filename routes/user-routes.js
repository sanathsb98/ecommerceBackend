const express = require('express');
const verifyToken = require('../middleware');
const getAllUsers = require('../controller/user-controller').getAllUsers;
const registerNewUser = require('../controller/user-controller').registerNewUser;
const signin = require('../controller/user-controller').signin;
const postimage = require('../controller/user-controller').postImage;
const allposts = require('../controller/user-controller').allPosts;

const router = express.Router()

router.get("/api/users", getAllUsers)
router.post("/api/signup", registerNewUser)
router.post("/api/signin", signin)
router.post("/api/postimage", postimage)
router.get("/api/allposts", allposts)
router.post("/api/data", verifyToken, (req, res) => {
    res.json({ message: `Welcome ${req.body.email}! this is protected data` })
})

module.exports = router;