const jwt = require('jsonwebtoken');
const userModal = require('../modal/user-modal');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'missing token' })
    }

    
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
        if (err) {
            res.status(403).json({ message: 'invalid token' })
        }
        else {
            const user = await userModal.find({ _id: decode.id })
            if (!user) {
                res.status(404).json({ message: 'token expired or user not found' })
            }
            req.user = user;
            next();
        }
    })
}

module.exports = verifyToken;