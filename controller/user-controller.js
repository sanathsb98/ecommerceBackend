const User = require('../modal/user-modal')
const bcrypt = require('bcryptjs')

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

// get user login details:
const signin = async (req, res) => {
    const { email } = req.body;
    let loginDetails;
    try {
        loginDetails = await User.findOne({ email })
        res.status(200).send({loginDetails})
    } catch (err) {
        res.status(404).send({ message: 'no user found' })
    }
}


module.exports = {
    getAllUsers,
    registerNewUser,
    signin
}