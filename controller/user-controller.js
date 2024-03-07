const User = require('../modal/user-modal')
const Posts = require('../modal/posts-modal')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils');


//getting all user data:
const getAllUsers = async(req,res,next) =>{

    let user;
   
    try {
        user = await User.find()
    } catch (err) {
        console.log(err)
    }

    if(user){
       return res.status(200).json({ user})
    }else{
       return res.status(404).json({ message: "no users found" })
    }
}


//register a new user:
const registerNewUser = async(req,res,next) => {
        const {name,email,password} = req.body;
        let isRegistered;

        //encrypt password
        const encryptedPassword = await bcrypt.hash(password,5)
      
        try{
          isRegistered = await User.findOne({email})

        }catch(err){
            console.log(err)
        }
        
        if(isRegistered){
           return  res.status(403).json({message :'user already registered'})
        }

        try{
            const newUser = new User({
                name,
                email,
                password : encryptedPassword,
             })
             await newUser.save()
             return res.status(200).json({newUser})

        }catch(err){
            console.log(err)
        }
}

// new user signin:
const signin = async (req, res) => {
    const { email, password } = req.body;

    // Logging the provided email and password for debugging purposes
    console.log(email);
    console.log(password);

    try {
        // Finding a user with the provided email in the database
        const loginDetails = await User.findOne({ email });


        // If no user found with the provided email
        if (!loginDetails) {
            res.status(401).send({ message: 'No user found' });
        } else {
            // Comparing the provided password with the hashed password stored in the database
            const isValidPassword = await bcrypt.compare(password, loginDetails.password);

            // If the password is valid
            if (isValidPassword) {
                // Generating a JWT token for the authenticated user
                const token = generateToken(loginDetails);
                // Sending the token in the response
                res.status(200).send({token : token ,loginDetails : loginDetails})
               
            } else {
                // If the password is incorrect
                res.status(200).send({ message: 'Incorrect password' });
            }
        }
    } catch (err) {
        // Handling any errors that occur during the process
        res.status(404).send({ message: 'No user found' });
    }
};

// post to database:
const postImage = async (req, res) => {
    const { userid, image, caption, likes } = req.body;

    console.log(userid)
    console.log(image)
    console.log(caption)
    console.log(likes)

    try {
        const post = new Posts({
            userid : userid,
            image : image,
            caption : caption,
            likes : likes
        })

        await post.save()
        return res.status(200).json({post})

    } catch (err) {
        res.status(400).send({ message: err })
    }

}

//show all posts:
const allPosts = async (req, res) => {
    try {
        const posts = await Posts.find()
        res.status(200).json({posts})
    } catch (err) {
        res.status(200).send({ message: err })
    }
}



module.exports = {
    getAllUsers,
    registerNewUser,
    signin,
    postImage,
    allPosts
}